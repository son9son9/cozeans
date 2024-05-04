import { useEffect } from "react";
import "../../App.css";
import styles from "./Details.module.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";

const itemInfo = {
  id: "1",
  name: "Ronty Wide Denim",
  thumbnail: "https://hififnk.kr/web/product/tiny/202401/c092e39528e850ccb42b19d1b0cf996f.jpg",
  size: "30",
  color: "",
  quantity: 1,
  price: "99000",
  discountedPrice: "",
  registrationDate: "2024-04-23",
};

const Details = (props) => {
  let isThereSameThingOnCart = false;
  const navigate = useNavigate();
  const location = useLocation();

  // 장바구니 아이템 추가
  const addToCartHandler = () => {
    // 로컬스토리지의 카트 데이터를 가져오기
    const currentCart = () => {
      const cartStorage = props.cartData;
      // 카트에 값이 있을 때만 parse
      if (cartStorage === "" || cartStorage === null || cartStorage === undefined) {
        return "";
      } else return JSON.parse(cartStorage);
    };

    // 기존의 카트에 같은 아이템이 있는지 확인 alert
    props.cartData &&
      JSON.parse(props.cartData)?.map((item, index) => {
        // stringify()로 두 객체 비교
        if (JSON.stringify(item) === JSON.stringify(itemInfo)) isThereSameThingOnCart = true;
      });
    if (isThereSameThingOnCart) {
      alert("동일한 상품이 이미 장바구니에 존재합니다.");
      return false;
    }

    // 새로운 카트 데이터 추가 후 stringify하여 로컬스토리지 및 state 업데이트
    let copy = [...currentCart(), itemInfo];
    props.setCartData(JSON.stringify(copy));
  };

  const onCheckoutHandler = () => {
    // 현재 임시로 장바구니 추가와 같은 로직 적용
    addToCartHandler();
    isThereSameThingOnCart || navigate(`/checkout`);
  };

  useEffect(() => console.log(location.state));

  return (
    <div className={`${styles.container} animate-after-render`}>
      <div className={styles.look}>
        <img src="/src/assets/attowidedenim21.png" alt="image1" />
        <img src="/src/assets/attowidedenim22.png" alt="image2" />
        <img src="/src/assets/attowidedenim23.png" alt="image3" />
        <img src="/src/assets/attowidedenim24.png" alt="image4" />
        <img src="/src/assets/attowidedenim25.png" alt="image5" />
        <img src="/src/assets/attowidedenim26.png" alt="image6" />
        <img src="/src/assets/attowidedenim27.png" alt="image7" />
        <img src="/src/assets/attowidedenim28.png" alt="image8" />
        <img src="/src/assets/attowidedenim29.png" alt="image9" />
        <img src="/src/assets/attowidedenim30.png" alt="image10" />
        <img src="/src/assets/attowidedenim31.png" alt="image11" />
      </div>
      <div className={styles.explanation}>
        <div className={styles["title-box"]}>
          <h3 className={styles.title}>Atto Wide Denim</h3>
          <div className={styles[("price", "bold")]}>99,000 KRW</div>
        </div>
        <div className={styles.content}>
          <div>
            노멀한 연청 컬러
            <br />
            캣 브러쉬 워싱 & 브러쉬 워싱
            <br />
            맥시한 기장감의 와이드 핏 혼용률 : Cotton 100%
            <br />
            <br />
            <div className={styles.bold}>Details</div>
            S
            <br />
            기장110 허리36 엉덩이49 밑위37 허벅지43 밑단26
            <br />
            M
            <br />
            기장111 허리38 엉덩이52 밑위39 허벅지44 밑단27
            <br />
            L
            <br />
            기장112 허리41 엉덩이54 밑위41 허벅지45 밑단28
            <br />
            <br />
            <div className={styles.bold}>Model Size</div>
            Men 179cm (M)
            <br />
            Woman 168cm (S)
          </div>
        </div>
        <div className={styles["select-box"]}>
          <select name="selectColor" id="">
            <option>Free</option>
          </select>
          <select name="selectSize" id="">
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
            <option>32</option>
            <option>33</option>
            <option>34</option>
          </select>
        </div>
        <div className={styles["button-box"]}>
          <button onClick={addToCartHandler}>ADD TO CART</button>
          <button onClick={onCheckoutHandler}>
            {/* <Link to="/checkout" > */}
            CHECKOUT
            {/* </Link> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
