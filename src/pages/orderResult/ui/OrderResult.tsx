import { useSearchParams } from "react-router-dom";
import styles from "./OrderResult.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import { formatNumberToCurrency } from "../../../common";
import { ROOT_PATH, SERVER_PATH } from "../../../config";
import { Link } from "react-router-dom";
import { ItemModel } from "../../../models/ItemModel";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { OrderInfoModel } from "../../../models/OrderInfoModel";

export const OrderResult = (props: any) => {
  const loginSession = useSelector((state: any) => state.loginSession.value);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  // 장바구니 데이터 불러오기
  const cart = useSelector((state: any) => state.cart.value);
  const [myCart, setMyCart] = useState(cart.filter((item: ItemModel) => item.user === loginSession?.userId));

  const mutation = useMutation<Response, Error, OrderInfoModel>({
    mutationFn: async (req) => {
      return await fetch(`${SERVER_PATH}success-order`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }).then((res) => res.json());
    },
    onSuccess: (data: any) => {},
    onError: (err: any) => {
      console.log("Order record Error: ", err);
    },
  });

  const orderDate = (param: any) => {
    let date = new Date(param);
    return `${date.getFullYear()}.${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1).toString()}.${
      date.getDate() > 9 ? date.getDate() : "0" + date.getDate().toString()
    } ${date.getHours() > 9 ? date.getHours() : "0" + date.getHours().toString()}:${
      date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds().toString()
    }`;
  };

  // store의 cart 변경이 일어날 때마다 myCart 업데이트
  useEffect(() => {
    setMyCart(cart.filter((item: ItemModel) => item.user === loginSession?.userId));
  }, [cart]);

  // 서버에 로그인세션 정보 넘겨주고 결제(완료) 상태 업데이트.
  useEffect(() => {
    if (props.isSucceed) {
      mutation.mutate(loginSession);
    }
  }, []);

  // 결제 완료 시 장바구니 초기화
  // useEffect(() => {
  //   if (props.isSucceed) {
  //     setMyCart([]);
  //   }
  // }, [mutation.isSuccess]);

  if (props.isSucceed) {
    return (
      <div className={`${styles.container} animate-after-render`}>
        <div className={styles.content}>
          <img className={styles.complete} src="https://cdn1.iconfinder.com/data/icons/material-core/18/check-512.png" />
          <h2>Your order is succeed !</h2>
          <h3>주문 정보</h3>
          <div className={styles["info"]}>
            <div className={styles["info-row"]}>
              <img src={myCart.length > 0 && myCart[0].thumbnail} className={styles.thumbnail} />
              <p>
                {myCart.length > 0 && myCart[0].name}
                {myCart.length > 1 && ` 외 ${myCart.length - 1}건`}
              </p>
            </div>
            <div className={styles["info-row"]}>
              <span>주문 번호</span>
              <span>{orderId}</span>
            </div>
            <div className={styles["info-row"]}>
              <span>주문 일자</span>
              <span>{mutation.data && orderDate(mutation.data.orderDate)}</span>
            </div>
            <div className={styles["info-row"]}>
              <span>주문 금액</span>
              <span>{formatNumberToCurrency(Number(amount))} 원</span>
            </div>
            <div className={styles["customer-info"]}></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`${styles.container} animate-after-render`}>
        <div>
          <h2>
            Your order is failed..
            <br />
            Please check your order again.
          </h2>
          <button>
            <Link to={`${ROOT_PATH}`}>BACK TO HOME</Link>
          </button>
        </div>
      </div>
    );
  }
};
