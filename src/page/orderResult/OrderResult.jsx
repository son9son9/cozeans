import "../../App.css";
import styles from "./OrderResult.module.scss";
import { Link } from "react-router-dom";

const OrderResult = (props) => {
  if (props.isSucceed === true) {
    return (
      <div className={`${styles.container} animate-after-render`}>
        <h1>it's succeed!</h1>
      </div>
    );
  } else {
    return (
      <div className={`${styles.container} animate-after-render`}>
        <h1>it's failed..</h1>
      </div>
    );
  }
};

export default OrderResult;
