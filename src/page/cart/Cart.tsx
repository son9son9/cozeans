import { useState, useEffect } from "react";
import "../../App.css";
import styles from "./Cart.module.scss";
import { Link } from "react-router-dom";
import PriceDisplayer from "../../component/priceDisplayer/PriceDisplayer";
import { formatNumberToCurrency } from "../../common";
import { rootPath } from "../../config";
import { ItemModel } from "../../models/ItemModel";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store";

const Cart = () => {
  const dispatch = useDispatch();
  const loginSession = useSelector((state: any) => state.loginSession.value);
  const [sum, setSum] = useState(0);
  // 장바구니 데이터 불러오기
  const cart = useSelector((state: any) => state.cart.value);
  const [myCart, setMyCart] = useState([]);
  // store의 cart 변경이 일어날 때마다 myCart 업데이트
  useEffect(() => {
    setMyCart(cart.filter((item: ItemModel) => item.user === loginSession?.id || Boolean(item.user) === Boolean(loginSession?.id)));
  }, [cart]);

  const onCloseHandler = (i: number) => {
    if (confirm("장바구니에서 삭제하시겠습니까?")) {
      dispatch(cartActions.removeItem(i));
      // 엘리먼트 리렌더링 이슈 미해결, 따라서 일단 페이지 리로드로 대체
      // window.location.reload();
    } else {
      return false;
    }
  };

  useEffect(() => {
    let total = 0;
    myCart.map((item: ItemModel) => {
      if (item.discountedPrice) {
        total += +item.discountedPrice * +item.quantity;
      } else if (item.price) {
        total += +item.price * +item.quantity;
      }
    });
    setSum(total);
  }, [myCart, sum]);

  // cartStorage가 비어있을 땐 비어있음 컴포넌트 반환
  if (!myCart || myCart.length === 0) {
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
        {myCart.map((item: ItemModel, index: number) => (
          <div className={styles.item} key={index}>
            <div className={styles["img-info-wrapper"]}>
              <img src={item.thumbnail} alt="Item Image" />
              <div className={styles["name-box"]}>
                <div>{item.name}</div>
                <div>SIZE : {item.size}</div>
                <div className={styles["quantity-box"]}>
                  <button
                    onClick={() => {
                      dispatch(cartActions.decreaseQuantity(index));
                    }}
                  >
                    ﹣
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => {
                      dispatch(cartActions.increaseQuantity(index));
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
