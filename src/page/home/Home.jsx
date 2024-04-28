import { useState } from "react";
import "../../App.css";
import ProductCard from "../../component/productCard/ProductCard";
import styles from "./Home.module.scss";
import { useEffect } from "react";
import { useRef } from "react";
import sample1 from "../../assets/sample1.png";
import sample2 from "../../assets/sample2.png";
import sample3 from "../../assets/sample3.png";
import sample4 from "../../assets/sample4.png";
import { Link } from "react-router-dom";
import { dataSample } from "../../dataSample";
import { displayPriceHandler, sortByNew } from "../../common";

const Home = () => {
  const marqueeRef = useRef();
  const [vpWidth, setVpWidth] = useState();
  const [offsetWidth, setOffsetWidth] = useState();
  const [numOfElement, setNumOfElement] = useState(0);
  const [beltText, setBeltText] = useState();
  const [newArrivalList] = useState(() => {
    const arr = [...dataSample];
    return sortByNew(arr).slice(0, 5);
  });

  // 배너 무한 스크롤 텍스트 복제
  useEffect(() => {
    // 뷰포트, 전광판 텍스트 길이 구하기
    setVpWidth(document.documentElement.clientWidth);
    setOffsetWidth(marqueeRef.current.offsetWidth);

    // 복제할 텍스트 개수 구하기
    let count = 1;
    let totalWidth = offsetWidth;

    while (totalWidth < vpWidth + offsetWidth) {
      totalWidth += offsetWidth;
      count++;
    }
    setNumOfElement(count);

    // 텍스트 복제
    const numArray = Array.from({ length: numOfElement }, (_, i) => i + 1);
    setBeltText(
      numArray.map((i) => {
        return <div key={i}>SITEWIDE SALE / SUMMER 2024 UP TO 30% OFF 100 BONUS POINTS ON PURCHASES OVER $300</div>;
      })
    );
  }, [vpWidth, offsetWidth, numOfElement]);

  return (
    <div className={`${styles.container} animate-after-render`}>
      <div className={styles.bannerbox}>
        <div className={styles.banner}>
          <div className={styles.bannertext}>
            <h2>Brand new trends in Cozeans</h2>
            <p>Let's check it out !</p>
            <Link to="/shop">
              <button>NEW ARRIVALS</button>
            </Link>
          </div>
        </div>
        <div className={styles.belt}>
          <div className={styles.text + " montserrat-semibold"} ref={marqueeRef}>
            {beltText}
            <div>SITEWIDE SALE / SUMMER 2024 UP TO 30% OFF 100 BONUS POINTS ON PURCHASES OVER $300</div>
          </div>
        </div>
      </div>
      <section className={styles["pic-list"]}>
        <div className={styles.subtitle}>
          <h2 className="judson-bold">NEW IN</h2>
          <Link to="/shop">
            <button className="judson-regular">MORE &gt;</button>
          </Link>
        </div>
        <div className={styles.cardbox}>
          {newArrivalList.map((item, index) => (
            <ProductCard name={<p>{item.name}</p>} price={displayPriceHandler(item)} src={item.thumbnail} key={index} />
          ))}
        </div>
      </section>
      <section className={styles["pic-list"]}>
        <div className={styles.subtitle}>
          <h2 className="judson-bold">FOLLOW US</h2>
        </div>
        <div className={styles.cardbox}>
          <div className={styles["img-wrapper"]}>
            <img src={sample1} alt="Sample" />
          </div>
          <div className={styles["img-wrapper"]}>
            <img src={sample2} alt="Sample" />
          </div>
          <div className={styles["img-wrapper"]}>
            <img src={sample3} alt="Sample" />
          </div>
          <div className={styles["img-wrapper"]}>
            <img src={sample4} alt="Sample" />
          </div>
        </div>
      </section>
      <section>
        <div className={styles.newsletter}>
          <div>SUBSCRIBE TO OUR</div>
          <h1 className="judson-bold">NEWSLETTERS</h1>
          <div>
            SIGN UP WITH YOUR EMAIL TO RECEIVE NEWS ABOUT <br />
            NEW COLLECTIONS,EVENTS AND SALES.
          </div>
          <div>
            <input type="text" placeholder="Email Address"></input>
            <button>FOLLOW US</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
