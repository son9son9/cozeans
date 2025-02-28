import { useState } from "react";
import styles from "./Details.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import PriceDisplayer from "../../../shared/priceDisplayer/PriceDisplayer";
import { ROOT_PATH } from "../../../config";
import { useSelector } from "react-redux";
import { useCartActions } from "../../../entities/cart";

export const Details = () => {
  const navigate = useNavigate();
  const loginSession = useSelector((state: any) => state.loginSession.value);
  const location = useLocation();
  const [selectedItemInfo, setSelectedItemInfo] = useState({ ...location.state.item, user: loginSession?.userId || "" });
  const { checkItemInCart, addToCart } = useCartActions();

  // 컬러와 사이즈 선택했는지 체크
  const validateSelection = (): boolean => {
    if (!selectedItemInfo.color) {
      alert("컬러를 선택해주세요.");
      return false;
    }
    if (!selectedItemInfo.size) {
      alert("사이즈를 선택해주세요.");
      return false;
    }
    return true;
  };

  // 비로그인 상태 확인
  const validateLogin = (): boolean => {
    if (Object.keys(loginSession).length === 0) {
      if (confirm("현재 비로그인 상태입니다. 로그인하시겠습니까?")) {
        navigate(`${ROOT_PATH}login`);
      }
      return false;
    }
    return true;
  };

  // 장바구니 아이템 추가
  const addToCartHandler = (target: any) => {
    if (!validateSelection()) return;
    if (!validateLogin()) return;

    // 기존의 카트에 같은 아이템이 있는지 확인 alert
    const hasSameItemInCart = checkItemInCart(selectedItemInfo);

    // 장바구니에 동일 상품이 있을 때
    if (hasSameItemInCart) {
      if (target === "CHECKOUT") {
        // Checkout 클릭 시 장바구니에 추가하지 않고 카트 페이지로 이동
        navigate(`${ROOT_PATH}cart`);
        return;
      } else {
        // 장바구니 추가 클릭 시 alert
        alert("동일한 상품이 이미 장바구니에 존재합니다.");
        return false;
      }
    }
    // CHECKOUT 클릭 시 장바구니에 물품 추가하고 cart 페이지로 바로 이동
    if (target === "CHECKOUT") {
      navigate(`${ROOT_PATH}cart`);
    }

    addToCart(selectedItemInfo);
  };

  const onCheckoutHandler = (e: any) => {
    // 현재 임시로 장바구니 추가와 같은 로직 적용
    addToCartHandler(e.target.innerHTML);
  };
  const colorSelectHandler = (e: any) => {
    setSelectedItemInfo({ ...selectedItemInfo, color: e.currentTarget.value });
  };
  const sizeSelectHandler = (e: any) => {
    setSelectedItemInfo({ ...selectedItemInfo, size: e.currentTarget.value });
  };

  return (
    <div className={`${styles.container} animate-after-render`}>
      <div className={styles.looks}>
        <img src={selectedItemInfo.thumbnail} alt="thumbnail" />
        <h3>Sample images for assortment</h3>
        <img src={`https://hififnk.kr/web/upload/NNEditor/20240505/DSC06885.jpg`} alt="image1" />
        <img src={`https://hififnk.kr/web/upload/NNEditor/20240505/DSC06889.jpg`} alt="image2" />
        <img src={`https://hififnk.kr/web/upload/NNEditor/20240505/DSC06895.jpg`} alt="image3" />
        <img src={`https://hififnk.kr/web/upload/NNEditor/20240505/DSC06900.jpg`} alt="image4" />
        <img src={`https://hififnk.kr/web/upload/NNEditor/20240505/DSC06909.jpg`} alt="image5" />
        <img src={`https://hififnk.kr/web/upload/NNEditor/20240505/DSC06916.jpg`} alt="image6" />
        <img src={`https://hififnk.kr/web/upload/NNEditor/20240505/DSC06919.jpg`} alt="image7" />
        <img src={`https://hififnk.kr/web/upload/NNEditor/20240505/DSC06922.jpg`} alt="image8" />
        <img src={`https://hififnk.kr/web/upload/NNEditor/20240505/DSC06930.jpg`} alt="image9" />
        <img src={`https://hififnk.kr/web/upload/NNEditor/20240506/KakaoTalk_Photo_2024-05-06-13-42-1120002.jpeg`} alt="image10" />
        <img src={`https://hififnk.kr/web/upload/NNEditor/20240506/KakaoTalk_Photo_2024-05-06-13-42-1120003.jpeg`} alt="image11" />
        <img src={`https://hififnk.kr/web/upload/NNEditor/20240506/KakaoTalk_Photo_2024-05-06-13-42-1220006.jpeg`} alt="image12" />
        <img src={`https://hififnk.kr/web/upload/NNEditor/20240506/KakaoTalk_Photo_2024-05-06-13-42-1220008.jpeg`} alt="image13" />
        <img src={`https://hififnk.kr/web/upload/NNEditor/20240506/KakaoTalk_Photo_2024-05-06-13-42-1220009.jpeg`} alt="image14" />
      </div>
      <div className={styles.explanation}>
        <div className={styles["title-box"]}>
          <h3 className={styles.title}>{selectedItemInfo.name}</h3>
          <div className={styles["price bold"]}>
            <PriceDisplayer item={selectedItemInfo} />
          </div>
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
          <p>Color</p>
          <select name="selectColor" id="" onChange={colorSelectHandler}>
            <option value="" defaultChecked>
              N/A
            </option>
            <option value={0}>Free</option>
          </select>
          <p>Size</p>
          <select name="selectSize" id="" onChange={sizeSelectHandler}>
            <option value="" defaultChecked>
              N/A
            </option>
            <option value={28}>28</option>
            <option value={29}>29</option>
            <option value={30}>30</option>
            <option value={31}>31</option>
            <option value={32}>32</option>
            <option value={33}>33</option>
            <option value={34}>34</option>
          </select>
        </div>
        <div className={styles["button-box"]}>
          <button onClick={(e) => addToCartHandler(e)}>ADD TO CART</button>
          <button
            onClick={(e) => {
              onCheckoutHandler(e);
            }}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};
