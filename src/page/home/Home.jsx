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

const Home = () => {
  const [vpWidth, setVpWidth] = useState();
  const [offsetWidth, setOffsetWidth] = useState();
  const [numOfElement, setNumOfElement] = useState(0);
  const marqueeRef = useRef();
  const [bannerText, setBannerText] = useState();

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
    setBannerText(
      numArray.map((i) => {
        return <div key={i}>SITEWIDE SALE / SUMMER 2024 UP TO 30% OFF 100 BONUS POINTS ON PURCHASES OVER $300</div>;
      })
    );
  }, [vpWidth, offsetWidth, numOfElement]);

  return (
    <div className={styles.container}>
      <div className={styles.bannerbox}>
        <div className={styles.banner}></div>
        <div className={styles.belt}>
          <div className={styles.text + " montserrat-semibold"} ref={marqueeRef}>
            {bannerText}
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
          <ProductCard
            name={<p>Atto Wide Denim</p>}
            price={
              <p>
                <span>99,000 KRW</span> <span>59,000 KRW</span>
              </p>
            }
            src={"https://hififnk.kr/web/product/tiny/202401/750a66ce58f98e251fa8d5d38dafecbc.jpg"}
          />
          <ProductCard
            name={<p>Zero Washed Boots-cut Denim</p>}
            price={<p>89,000 KRW</p>}
            src={"https://hififnk.kr/web/product/tiny/202401/2eff06824ff6d8a082988dfcba60903e.jpg"}
          />
          <ProductCard
            name={<p>Ronty Wide Denim</p>}
            price={<p>99,000 KRW</p>}
            src={"https://hififnk.kr/web/product/tiny/202401/c092e39528e850ccb42b19d1b0cf996f.jpg"}
          />
          <ProductCard
            name={<p>Edit Teen Dyeing Denim</p>}
            price={<p>79,000 KRW</p>}
            src={"https://hififnk.kr/web/product/tiny/202312/9e154fc69c24191d2a169db384d875c8.jpg"}
          />
          <ProductCard
            name={<p>Roel Curved Denim</p>}
            price={
              <p>
                <span>109,000 KRW</span> <span>69,000 KRW</span>
              </p>
            }
            src={"https://hififnk.kr/web/product/tiny/202312/6f1a3abd7722a14adae262991f60e378.jpg"}
          />
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
