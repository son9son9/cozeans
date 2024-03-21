import { useState } from "react";
import "../../App.css";
import styles from "./Cart.module.scss";
import { Link } from "react-router-dom";

// 장바구니 상품 정보
const itemInfo = [
  {
    name: "Ronty Wide Denim",
    image: "https://hififnk.kr/web/product/tiny/202401/c092e39528e850ccb42b19d1b0cf996f.jpg",
    size: "30",
    quantity: 1,
    price: "99,000",
  },
  {
    name: "Edit Teen Dyeing Denim",
    image: "https://hififnk.kr/web/product/tiny/202312/9e154fc69c24191d2a169db384d875c8.jpg",
    size: "32",
    quantity: 1,
    price: "79,000",
  },
];

const Cart = () => {
  const [items, setItems] = useState(itemInfo);
  const [sum, setSum] = useState(0);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Your Cart</h3>
      <div className={styles.list}>
        {/* 아이템 리스트 배열 */}
        {items.map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles["img-info-wrapper"]}>
              <img src={item.image} alt="Item Image" />
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
