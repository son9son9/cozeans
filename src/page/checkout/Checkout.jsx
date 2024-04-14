import "../../App.css";
import styles from "./Checkout.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import Modal from "../../component/modal/Modal";
import DaumPostCode from "react-daum-postcode";

// 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요.
// 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
const widgetClientKey = "test_ck_DpexMgkW36GDoPpWy9G4VGbR5ozO";
const customerKey = "ub4-rdnIUIaHFUiLi0LL1";
// const paymentWidget = PaymentWidget(widgetClientKey, PaymentWidget.ANONYMOUS) // 비회원 결제

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

const Checkout = () => {
  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(100);
  const [discountTemp, setDiscountTemp] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressData, setAddressData] = useState({});
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
  }, []);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods("#payment-widget", { value: price }, { variantKey: "DEFAULT" });

    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, price]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const handlePaymentRequest = async () => {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      await paymentWidget?.requestPayment({
        orderId: generateRandomString(),
        orderName: "토스 티셔츠 외 2건",
        customerName: "김토스",
        customerEmail: "customer123@gmail.com",
        customerMobilePhone: "01012341234",
        successUrl: `${window.location.origin}/order-success`,
        failUrl: `${window.location.origin}/order-fail`,
      });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  const toggleAddressModal = () => {
    setIsAddressModalOpen(!isAddressModalOpen);
  };
  const inputAddress = (data) => {
    setAddressData(data);
    console.log("입력 주소 데이터", addressData);
  };
  const toggleCouponModal = () => {
    setIsCouponModalOpen(!isCouponModalOpen);
  };
  const radioCheckHandler = (e) => {
    setDiscountTemp(e.currentTarget.value);
  };
  const couponConfirmHandler = () => {
    setDiscount(discountTemp);
    toggleCouponModal();
  };

  return (
    <div className={styles.container}>
      <h1>ORDER</h1>
      <h2>Shipping Infomation</h2>
      <div className={styles["info-box"]}>
        <div className={styles["label-wrapper"]}>
          <label>받으시는 분</label>
        </div>
        <div className={styles["input-wrapper"]}>
          <input type="text" />
        </div>
        <div className={styles["label-wrapper"]}>
          <label>주소</label>
        </div>
        <div className={styles["address-box"]}>
          <input type="text" placeholder="우편번호" readOnly value={addressData.zonecode} />
          <button onClick={toggleAddressModal}>주소 검색</button>
          <input type="text" className={styles["long-input"]} placeholder="기본주소" readOnly value={addressData.address} />
          <input type="text" className={styles["long-input"]} placeholder="상세주소" />
        </div>
        <div className={styles["label-wrapper"]}>
          <label>휴대전화</label>
        </div>
        <div className={styles["input-wrapper"]}>
          <input type="text" className={styles["phone-input"]} maxLength={3} />-
          <input type="text" className={styles["phone-input"]} maxLength={4} />-
          <input type="text" className={styles["phone-input"]} maxLength={4} />
        </div>
        <div className={styles["label-wrapper"]}>
          <label>E-mail</label>
        </div>
        <div className={styles["input-wrapper"]}>
          <input type="text" className={styles[""]} />
        </div>
        <div className={styles["label-wrapper"]}>
          <label>배송 메시지</label>
        </div>
        <textarea />
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
          <span className={`${styles.price} ${styles.bold}`}>{price} 원</span>
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
