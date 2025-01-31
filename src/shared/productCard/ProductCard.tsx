import { useState } from "react";
import styles from "./ProductCard.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import PriceDisplayer from "../priceDisplayer/PriceDisplayer";
import { ROOT_PATH } from "../../config";

const ProductCard = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = props.data.thumbnail;
    img.onload = () => setIsLoading(false);
    img.onerror = () => setHasError(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  return (
    <div className={styles.card}>
      <Link to={`${ROOT_PATH}details/${props.data.id.toString()}`} state={{ item: props.data }}>
        <div className={styles.imagebox}>
          {isLoading ? <div className="loader"></div> : <img src={props.data.thumbnail} alt="Product Image" loading="lazy" />}
        </div>
      </Link>
      <div className={styles["product-textbox"]}>
        <div className={styles["product-name"]}>
          <Link to={`${ROOT_PATH}details/${props.data.id.toString()}`} state={{ item: props.data }}>
            {props.data.name}
          </Link>
        </div>
        <div className={styles["product-price"]}>
          <Link to={`${ROOT_PATH}details/${props.data.id.toString()}`} state={{ item: props.data }}>
            <PriceDisplayer item={props.data} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
