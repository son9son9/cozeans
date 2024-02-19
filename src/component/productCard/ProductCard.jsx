import "../../App.css";
import styles from "./ProductCard.module.scss";

const ProductCard = (props) => {
  return (
    <div className={styles.card}>
      <img src={props.src} alt="Product Image" />
      <div className={styles["product-textbox"]}>
        <div className={styles["product-name"]}>{props.name}</div>
        <div className={styles["product-price"]}>{props.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
