import { useSearchParams } from "react-router-dom";
import "../../App.css";
import styles from "./OrderResult.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const OrderResult = (props) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const location = useLocation();

  useEffect(() => {
    console.log(props);
  }, []);

  if (props.isSucceed === true) {
    return (
      <div className={`${styles.container} animate-after-render`}>
        <div>
          <h2>Your Order has been succeed !</h2>
          <p>payment key: {paymentKey}</p>
          <p>order id: {orderId}</p>
          <p>amount: {amount}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`${styles.container} animate-after-render`}>
        <div>
          <h2>
            Your Order has been failed..
            <br />
            Please check your order again
          </h2>
        </div>
      </div>
    );
  }
};

export default OrderResult;
