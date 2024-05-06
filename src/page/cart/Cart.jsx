import { useState, useEffect } from "react";
import "../../App.css";
import styles from "./Cart.module.scss";
import { Link } from "react-router-dom";
import PriceDisplayer from "../../component/priceDisplayer/PriceDisplayer";
import { formatNumberToCurrency } from "../../common";
import { rootPath } from "../../config";

const Cart = (props) => {
  const loginSession = props.loginSession && JSON.parse(props.loginSession);
  // 로컬스토리지 장바구니 데이터 불러오기
  const [items, setItems] = useState(
    props.cartData && JSON.parse(props.cartData).filter((item) => item.user === loginSession.id || Boolean(item.user) === Boolean(loginSession.id))
  );
  const [sum, setSum] = useState(0);

  const onCloseHandler = (i) => {
    if (confirm("장바구니에서 삭제하시겠습니까?")) {
      const arr = items;
      arr.splice(i, 1);
      props.setCartData(JSON.stringify(arr));
      // 엘리먼트 리렌더링 이슈 미해결, 따라서 일단 페이지 리로드로 대체
      window.location.reload();
    } else {
      return false;
    }
  };

  useEffect(() => {
    let total = 0;
    items &&
      items.map((item, index) => {
        if (item.discountedPrice) {
          total += Number(item.discountedPrice * item.quantity);
        } else if (item.price) {
          total += Number(item.price * item.quantity);
        }
      });
    setSum(total);
  }, [items, sum]);

  // cartStorage가 비어있을 땐 비어있음 컴포넌트 반환
  if (!items || items.length === 0) {
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
                      const arr = [...items];
                      if (arr[index].quantity > 1) arr[index].quantity--;
                      setItems(arr);
                      props.setCartData(JSON.stringify(arr));
                    }}
                  >
                    ﹣
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => {
                      const arr = [...items];
                      if (arr[index].quantity < 99) arr[index].quantity++;
                      setItems(arr);
                      props.setCartData(JSON.stringify(arr));
                    }}
                  >
                    ﹢
                  </button>
                </div>
              </div>
            </div>
            <div className={styles["close-price-box"]}>
              <div className={styles.close}>
                <button onClick={() => onCloseHandler(index)}>✕</button>
              </div>
              <PriceDisplayer item={item} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.checkout}>
        <div>SUM : {formatNumberToCurrency(sum)} KRW</div>
        <button>
          <Link to={`${rootPath}checkout`}>CHECKOUT</Link>
        </button>
      </div>
    </div>
  );
};

export default Cart;
