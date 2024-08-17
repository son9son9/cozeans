import "../../App.css";
import styles from "./Checkout.module.scss";
import { FormEvent, FormEventHandler, useEffect, useRef, useState } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import Modal from "../../component/modal/Modal";
import DaumPostCode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import { formatNumberToCurrency } from "../../common";
import { ROOT_PATH, SERVER_PATH } from "../../config";
import { ItemModel } from "../../models/ItemModel";
import { OrderInfoModel } from "../../models/OrderInfoModel";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";

// 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요.
// 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
const widgetClientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "ub4-rdnIUIaHFUiLi0LL1";
// const paymentWidget = PaymentWidget(widgetClientKey, PaymentWidget.ANONYMOUS) // 비회원 결제

const Checkout = (props: any) => {
  const navigate = useNavigate();
  const loginSession = useSelector((state: any) => state.loginSession.value);
  // const orderHistory = useSelector((state: any) => state.orderHistory.value);
  const [paymentWidget, setPaymentWidget]: any = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(0);
  const [originPrice, setOriginPrice] = useState(0);
  const [discountTemp, setDiscountTemp] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressData, setAddressData]: any = useState();
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  // 장바구니 데이터 불러오기
  const cart = useSelector((state: any) => state.cart.value);
  const [myCart, setMyCart] = useState(cart.filter((item: ItemModel) => item.user === loginSession?.userId));
  const [sum, setSum] = useState(0);
  // 배송정보 데이터
  const [customerInput, setCustomerInput] = useState({
    name: "",
    addressZonecode: "",
    address: "",
    addressDetail: "",
    phoneFirstNumber: "",
    phoneMiddleNumber: "",
    phoneLastNumber: "",
    email: "",
    message: "",
  });
  const sessionQuery = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      return await fetch(`${SERVER_PATH}session-info?user-id=${loginSession.userId}`).then((res) => res.json());
    },
    enabled: false,
  });
  const order = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      return await fetch(`${SERVER_PATH}get-order?user-id=${loginSession.userId}`).then((res) => res.json());
    },
    enabled: false,
  });
  const mutation = useMutation<Response, Error, OrderInfoModel>({
    mutationFn: async (req) => {
      return await fetch(`${SERVER_PATH}record-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }).then((res) => res.json());
    },
    onSuccess: (data: any) => {
      if (data.success) {
      } else {
      }
    },
    onError: (err: any) => {
      console.log("Order record Error: ", err);
    },
  });

  // store의 cart 변경이 일어날 때마다 myCart 업데이트
  useEffect(() => {
    setMyCart(cart.filter((item: ItemModel) => item.user === loginSession?.userId));
  }, [cart]);

  // 비로그인 시 로그인 화면으로 보내기
  useEffect(() => {
    if (Object.keys(loginSession).length === 0) {
      alert("로그인 후 결제를 진행해주세요.");
      navigate(`${ROOT_PATH}login`);
    }
  }, []);

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget: any = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    // 결제 금액 구하기
    let total = 0;
    myCart.map((item: ItemModel) => {
      if (item.discountedPrice) {
        total += +item.discountedPrice * +item.quantity;
      } else if (item.price) {
        total += +item.price * +item.quantity;
      }
    });
    setSum(total);
    setPrice(total);
    setOriginPrice(total);

    fetchPaymentWidget();
  }, [myCart]);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods("#payment-widget", { value: price }, { variantKey: "DEFAULT" });

    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, price]);

  useEffect(() => {
    const paymentMethodsWidget: any = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  // 주소 입력란의 주소를 state에 저장
  useEffect(() => {
    setCustomerInput({ ...customerInput, addressZonecode: addressData?.zonecode, address: addressData?.address });
  }, [addressData]);

  const handlePaymentRequest = async () => {
    // login session 검사
    if (!(await sessionQuery.refetch().then((res) => res.data.success))) {
      alert("로그인 세션이 유효하지 않습니다.");
      return false;
    }
    // input 검사
    if (!customerInput.name) {
      alert("이름을 입력하세요.");
      return false;
    }
    if (!customerInput.address || !customerInput.addressZonecode) {
      alert("주소를 입력하세요.");
      return false;
    }
    if (!customerInput.email) {
      alert("이메일을 입력하세요.");
      return false;
    }
    if (!customerInput.phoneFirstNumber || !customerInput.phoneMiddleNumber || !customerInput.phoneLastNumber) {
      alert("유효하지 않은 전화번호입니다. 다시 입력해주세요.");
      return false;
    } else if ((customerInput.phoneFirstNumber + customerInput.phoneMiddleNumber + customerInput.phoneLastNumber)?.length !== 11) {
      alert("전화번호 형식에 맞지 않습니다. 다시 입력해주세요.");
      return false;
    }

    // Order info 서버에 저장
    const orderInfo: OrderInfoModel = {
      user: loginSession.userId,
      customerInfo: customerInput,
      amount: price,
      orderDate: Date.now(),
      status: "pending",
    };
    await mutation.mutate(orderInfo);
    await order.refetch().then((res) => {
      console.log("order 불러옴", res.data);
    });
    return false;

    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      await paymentWidget?.requestPayment({
        orderName: `${myCart.length !== myCart[0].name}${myCart.length > 1 && ` 외 ${myCart.length - 1}건`}`,
        customerName: customerInput.name,
        customerEmail: customerInput.email,
        customerMobilePhone: `${customerInput.phoneFirstNumber + customerInput.phoneMiddleNumber + customerInput.phoneLastNumber}`,
        successUrl: `${window.location.origin}${ROOT_PATH}order-success`,
        failUrl: `${window.location.origin}${ROOT_PATH}order-fail`,
      });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  const toggleAddressModal = () => {
    setIsAddressModalOpen(!isAddressModalOpen);
  };
  const inputAddress = (data: any) => {
    setAddressData(data);
  };
  const toggleCouponModal = () => {
    setIsCouponModalOpen(!isCouponModalOpen);
  };
  const radioCheckHandler = (e: any) => {
    setDiscountTemp(e.currentTarget.value);
  };
  const couponConfirmHandler = () => {
    setDiscount(discountTemp);
    setPrice(() => {
      if (originPrice - discountTemp < 0) {
        return 0;
      } else return originPrice - discountTemp;
    });
    toggleCouponModal();
  };

  return (
    <div className={`${styles.container} animate-after-render`}>
      <h1>ORDER</h1>
      <h2>Shipping Infomation</h2>
      <div className={styles["info-box"]}>
        <div className={styles["label-wrapper"]}>
          <label>
            받으시는 분<span className={styles.red}>*</span>
          </label>
        </div>
        <div className={styles["input-wrapper"]} onChange={(e: any) => setCustomerInput({ ...customerInput, name: e.target.value })}>
          <input type="text" />
        </div>
        <div className={styles["label-wrapper"]}>
          <label>
            주소 <span className={styles.red}>*</span>
          </label>
        </div>
        <div className={styles["address-box"]}>
          <input type="text" placeholder="우편번호" readOnly value={addressData?.zonecode} />
          <button onClick={toggleAddressModal}>주소 검색</button>
          <input type="text" className={styles["long-input"]} placeholder="기본주소" readOnly value={addressData?.address} />
          <input
            type="text"
            className={styles["long-input"]}
            placeholder="상세주소"
            onChange={(e) => setCustomerInput({ ...customerInput, addressDetail: e.target.value })}
          />
        </div>
        <div className={styles["label-wrapper"]}>
          <label>
            휴대전화 <span className={styles.red}>*</span>
          </label>
        </div>
        <div className={styles["input-wrapper"]}>
          <input
            type="text"
            className={styles["phone-input"]}
            maxLength={3}
            onChange={(e) => setCustomerInput({ ...customerInput, phoneFirstNumber: e.target.value })}
          />
          -
          <input
            type="text"
            className={styles["phone-input"]}
            maxLength={4}
            onChange={(e) => setCustomerInput({ ...customerInput, phoneMiddleNumber: e.target.value })}
          />
          -
          <input
            type="text"
            className={styles["phone-input"]}
            maxLength={4}
            onChange={(e) => setCustomerInput({ ...customerInput, phoneLastNumber: e.target.value })}
          />
        </div>
        <div className={styles["label-wrapper"]}>
          <label>
            E-mail <span className={styles.red}>*</span>
          </label>
        </div>
        <div className={styles["input-wrapper"]}>
          <input type="text" className={styles[""]} onChange={(e) => setCustomerInput({ ...customerInput, email: e.target.value })} />
        </div>
        <div className={styles["label-wrapper"]}>
          <label>배송 메시지</label>
        </div>
        <textarea onChange={(e: any) => setCustomerInput({ ...customerInput, message: e.target.value })} />
      </div>
      <h2>Payment Amount</h2>
      <div className={styles["info-box"]}>
        <div className={styles["label-wrapper"]}>
          <label>할인 적용</label>
        </div>
        <div className={styles["input-wrapper"]}>
          <span className={styles.price}>{discount} 원</span>
          <button onClick={toggleCouponModal}>쿠폰 사용</button>
        </div>
        <div className={styles["label-wrapper"]}>
          <label className={styles.bold}>최종 결제금액</label>
        </div>
        <div className={styles["input-wrapper"]}>
          <span className={`${styles.price} ${styles.bold}`}>{formatNumberToCurrency(price)} 원</span>
        </div>
      </div>
      {/* 결제 UI, 이용약관 UI 영역 */}
      <div>
        <div id="payment-widget" />
        <div id="agreement" />
      </div>
      {/* 결제하기 버튼 */}
      <button onClick={handlePaymentRequest} className={styles["btn-checkout"]}>
        결제하기
      </button>
      {/* 쿠폰 적용 모달 */}
      <Modal toggleModal={toggleCouponModal} isOpen={isCouponModalOpen}>
        <h2>보유 쿠폰 현황</h2>
        <ul>
          <li>
            <label>
              <input type="radio" name="coupon" value={3000} onChange={radioCheckHandler} />
              &nbsp;무료 할인 쿠폰 이벤트 (3,000원)
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="coupon" value={0} onChange={radioCheckHandler} />
              &nbsp;선택 안함
            </label>
          </li>
        </ul>
        <button onClick={couponConfirmHandler}>확인</button>
      </Modal>
      {/* 주소 입력 모달 */}
      <Modal toggleModal={toggleAddressModal} isOpen={isAddressModalOpen}>
        <DaumPostCode onComplete={inputAddress} onClose={toggleAddressModal} />
      </Modal>
    </div>
  );
};

export default Checkout;
