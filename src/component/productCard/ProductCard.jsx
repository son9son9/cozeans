import { useState } from "react";
import "../../App.css";
import styles from "./ProductCard.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import PriceDisplayer from "../priceDisplayer/PriceDisplayer";

const ProductCard = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.card}>
      <Link to={`/details/${props.data.id.toString()}`} state={{ item: props.data }}>
        <div className={styles.imagebox}>
          {isLoading ? (
            <div className={styles.loader}>
              <h2>Loading...</h2>
            </div>
          ) : (
            <img src={props.data.thumbnail} alt="Product Image" />
          )}
        </div>
      </Link>
      <div className={styles["product-textbox"]}>
        <div className={styles["product-name"]}>
          <Link to={`/details/${props.data.id.toString()}`} state={{ item: props.data }}>
            {props.data.name}
          </Link>
        </div>
        <div className={styles["product-price"]}>
          <Link to={`/details/${props.data.id.toString()}`} state={{ item: props.data }}>
            <PriceDisplayer item={props.data} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
