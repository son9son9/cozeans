import { useSearchParams } from "react-router-dom";
import "../../App.css";
import styles from "./OrderResult.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import { formatNumberToCurrency } from "../../common";
import { ROOT_PATH } from "../../config";
import { Link } from "react-router-dom";
import { ItemModel } from "../../models/ItemModel";
import { useSelector } from "react-redux";

const OrderResult = (props: any) => {
  const loginSession = useSelector((state: any) => state.loginSession.value);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  // 장바구니 데이터 불러오기
  const cart = useSelector((state: any) => state.cart.value);
  const [myCart, setMyCart] = useState(
    cart.filter((item: ItemModel) => item.user === loginSession?.userId || Boolean(item.user) === Boolean(loginSession?.userId))
  );
  let orderHistory: any = localStorage.getItem("cozeans-order-info");
  orderHistory = orderHistory && JSON.parse(orderHistory);
  const currentOrder = orderHistory && orderHistory[orderHistory.length - 1];

  const orderDate = () => {
    let date = new Date(currentOrder.orderDate);
    return `${date.getFullYear()}.${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1).toString()}.${
      date.getDate() > 9 ? date.getDate() : "0" + date.getDate().toString()
    } ${date.getHours() > 9 ? date.getHours() : "0" + date.getHours().toString()}:${
      date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds().toString()
    }`;
  };

  // store의 cart 변경이 일어날 때마다 myCart 업데이트
  useEffect(() => {
    setMyCart(cart.filter((item: ItemModel) => item.user === loginSession?.userId || Boolean(item.user) === Boolean(loginSession?.userId)));
  }, [cart]);

  useEffect(() => {
    let arr;
    // orderHistory 결제 상태 업데이트
    if (props.isSucceed) {
      if (orderHistory) {
        orderHistory.pop();
        arr = [...orderHistory, { ...currentOrder, status: "succeed" }];
      } else {
        arr = [currentOrder];
      }
      localStorage.setItem("cozeans-order-info", JSON.stringify(arr));
    }
  }, []);

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
              <span>{orderDate()}</span>
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

export default OrderResult;
