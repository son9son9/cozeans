import { useState } from "react";
import "../../App.css";
import styles from "./Cart.module.scss";
import { Link } from "react-router-dom";

const Cart = (props) => {
  // 로컬스토리지 장바구니 데이터 불러오기
  const cartStorage = localStorage.getItem("my-cart") && JSON.parse(localStorage.getItem("my-cart"));
  const [items, setItems] = useState(cartStorage);
  const [sum, setSum] = useState(0);

  // cartStorage가 비어있을 땐 비어있음 컴포넌트 반환
  if (items === "" || items === null || items === undefined) {
    return (
      <div className={`${styles.container} animate-after-render`}>
        <h2>Your cart is empty.</h2>
      </div>
    );
  }
  return (
    <div className={`${styles.container} animate-after-render`}>
      <h3 className={styles.title}>Your Cart</h3>
      <div className={styles.list}>
        {/* 아이템 리스트 배열 */}
        {items.map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles["img-info-wrapper"]}>
              <img src={item.thumbnail} alt="Item Image" />
              <div className={styles["name-box"]}>
                <div>{item.name}</div>
                <div>SIZE : {item.size}</div>
                <div className={styles["quantity-box"]}>
                  <button
                    onClick={() => {
                      const copy = [...items];
                      if (copy[index].quantity > 1) copy[index].quantity--;
                      setItems(copy);
                    }}
                  >
                    ﹣
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => {
                      const copy = [...items];
                      if (copy[index].quantity < 99) copy[index].quantity++;
                      setItems(copy);
                    }}
                  >
                    ﹢
                  </button>
                </div>
              </div>
            </div>
            <div className={styles["close-price-box"]}>
              <div className={styles.close}>
                <button>✕</button>
              </div>
              <div className={styles.price}>{item.price} KRW</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.checkout}>
        <div>SUM : {sum} KRW</div>
        <button>
          <Link to="/checkout">CHECKOUT</Link>
        </button>
      </div>
    </div>
  );
};

export default Cart;
