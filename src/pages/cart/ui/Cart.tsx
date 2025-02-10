import styles from "./Cart.module.scss";
import { Link } from "react-router-dom";
import PriceDisplayer from "../../../shared/priceDisplayer/PriceDisplayer";
import { formatNumberToCurrency } from "../../../common";
import { ROOT_PATH } from "../../../config";
import { ItemModel } from "../../../models/ItemModel";
import { useCartActions } from "../../../entities/cart";
import { useSum } from "../lib/getSum";

export const Cart = () => {
  const { removeItem, decItemQuantity, incItemQuantity, myCart } = useCartActions();
  const { sum } = useSum(myCart());

  // cartStorage가 비어있을 땐 비어있음 컴포넌트 반환
  if (myCart().length === 0) {
    return (
      <div className={`${styles.container} animate-after-render`} style={{ justifyContent: "center" }}>
        <div>
          <h2>Your cart is empty.</h2>
        </div>
      </div>
    );
  }
  return (
    <div className={`${styles.container} animate-after-render`}>
      <h3 className={styles.title}>Your Cart</h3>
      <div className={styles.list}>
        {/* 아이템 리스트 배열 */}
        {myCart().map((item: ItemModel, index: number) => (
          <div className={styles.item} key={index}>
            <div className={styles["img-info-wrapper"]}>
              <img src={item.thumbnail} alt="Item Image" />
              <div className={styles["name-box"]}>
                <div>{item.name}</div>
                <div>SIZE : {item.size}</div>
                <div className={styles["quantity-box"]}>
                  <button onClick={() => decItemQuantity(index)}>﹣</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incItemQuantity(index)}>﹢</button>
                </div>
              </div>
            </div>
            <div className={styles["close-price-box"]}>
              <div className={styles.close}>
                <button onClick={() => removeItem(index)}>✕</button>
              </div>
              <PriceDisplayer item={item} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.checkout}>
        <div>SUM : {formatNumberToCurrency(sum)} KRW</div>
        <button>
          <Link to={`${ROOT_PATH}checkout`}>CHECKOUT</Link>
        </button>
      </div>
    </div>
  );
};
