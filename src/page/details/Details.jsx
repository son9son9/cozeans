import "../../App.css";
import styles from "./Details.module.scss";

const Details = () => {
  return (
    <div className={styles.container}>
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
          <button>ADD TO CART</button>
          <button>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Details;
