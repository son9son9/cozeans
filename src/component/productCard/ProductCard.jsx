import "../../App.css";
import styles from "./ProductCard.module.scss";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <div className={styles.card}>
      <Link to="/details">
        <div className={styles.imagebox}>
          <img src={props.src} alt="Product Image" />
        </div>
      </Link>
      <div className={styles["product-textbox"]}>
        <div className={styles["product-name"]}>
          <Link to="/details">{props.name}</Link>
        </div>
        <div className={styles["product-price"]}>
          <Link to="/details">{props.price}</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
