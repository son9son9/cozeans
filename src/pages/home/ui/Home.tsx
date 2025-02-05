import { useLayoutEffect, useState } from "react";
import ProductCard from "../../../shared/productCard/ProductCard";
import styles from "./Home.module.scss";
import { useEffect } from "react";
import { useRef } from "react";
import banner1 from "../../../shared/assets/banner-img1.webp";
import banner2 from "../../../shared/assets/banner-img2.webp";
import sample1 from "../../../shared/assets/sample1.png";
import sample2 from "../../../shared/assets/sample2.png";
import sample3 from "../../../shared/assets/sample3.png";
import sample4 from "../../../shared/assets/sample4.png";
import { Link } from "react-router-dom";
import Modal from "../../../shared/modal/Modal";
import ringing from "../../../shared/assets/ringing.png";
import { ROOT_PATH } from "../../../config";
import { ItemModel } from "../../../models/ItemModel";
import { useAuth } from "../../../features/auth";
import { useHypedItemsQuery } from "../api/useHypedItemsQuery";
import { bannerTextCalculator } from "../lib/bannerTextCalculator";

const BANNER_TEXT = "SITEWIDE SALE / SUMMER 2024 UP TO 30% OFF 100 BONUS POINTS ON PURCHASES OVER $300";

export const Home = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [rotateBannerFlag, setRotateBannerFlag] = useState(1);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [newslettersEmail, setNewslettersEmail]: any = useState();
  const [bannerTextArray, setBannerTextArray] = useState([BANNER_TEXT]);
  const { isPending, error, data } = useHypedItemsQuery();

  useAuth();

  const toggleFollowModal = () => {
    if (!newslettersEmail) {
      return false;
    }
    setIsFollowModalOpen(!isFollowModalOpen);
  };

  // 배너 문구 횟수 계산
  useLayoutEffect(() => {
    if (marqueeRef.current?.offsetWidth) {
      setBannerTextArray(bannerTextCalculator(marqueeRef.current.offsetWidth, BANNER_TEXT));
    }
  }, [marqueeRef]);

  // 10초마다 배너 전광판 이미지 교체
  useEffect(() => {
    setTimeout(() => {
      setRotateBannerFlag(rotateBannerFlag === 1 ? 2 : 1);
    }, 5000);
  }, [rotateBannerFlag]);

  return (
    <div className={`${styles.container} animate-after-render`}>
      <div className={styles.bannerbox}>
        <div className={styles.banner}>
          <div className={styles["banner-img-wrapper"]}>
            <img src={banner1} className={`${rotateBannerFlag === 1 ? styles.hype : ""} animate-after-render`} />
            <img src={banner2} className={rotateBannerFlag === 2 ? styles.hype : ""} />
            <div className={styles.bannertext}>
              <h2>Brand new trends in Cozeans</h2>
              <p>Let&apos;s check it out !</p>
              <Link to={`${ROOT_PATH}shop`}>
                <button>NEW ARRIVALS</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.belt}>
          <div className={styles.text + " montserrat-semibold"} ref={marqueeRef}>
            {bannerTextArray?.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>
        </div>
      </div>
      <section className={styles["pic-list"]}>
        <div className={styles.subtitle}>
          <h2 className="judson-bold">NEW IN</h2>
          <Link to={`${ROOT_PATH}shop`}>
            <button className="judson-regular">MORE &gt;</button>
          </Link>
        </div>
        <div className={styles.cardbox}>
          {isPending && <div>is Loading...</div>}
          {data && data.map((item: ItemModel) => <ProductCard data={item} key={item.id} />)}
        </div>
      </section>
      <section className={styles["brand-explain"]}>
        <div>
          <picture>
            <source
              srcSet="https://www.calvinklein.co.kr/dw/image/v2/BGLQ_PRD/on/demandware.static/-/Library-Sites-calvin-klein-shared-library/default/dw386a9a9f/Jungkook/Denim Page Update desktop2.jpg"
              media="(min-width: 768px)"
            />
            <source
              srcSet="https://www.calvinklein.co.kr/dw/image/v2/BGLQ_PRD/on/demandware.static/-/Library-Sites-calvin-klein-shared-library/default/dw386a9a9f/Jungkook/Denim Page Update desktop2.jpg"
              media="(min-width: 1024px)"
            />
            <img src="https://www.calvinklein.co.kr/dw/image/v2/BGLQ_PRD/on/demandware.static/-/Library-Sites-calvin-klein-shared-library/default/dw386a9a9f/Jungkook/Denim Page Update desktop2.jpg" />
          </picture>
          <picture>
            <source
              srcSet="https://www.calvinklein.co.kr/dw/image/v2/BGLQ_PRD/on/demandware.static/-/Library-Sites-calvin-klein-shared-library/default/dwe01b758f/ck_jeans-clp/Denim-Page-men-90s-jacket-jeans-CK-desktop.jpg"
              media="(min-width: 768px)"
            />
            <source
              srcSet="https://www.calvinklein.co.kr/dw/image/v2/BGLQ_PRD/on/demandware.static/-/Library-Sites-calvin-klein-shared-library/default/dwe01b758f/ck_jeans-clp/Denim-Page-men-90s-jacket-jeans-CK-desktop.jpg"
              media="(min-width: 1024px)"
            />
            <img src="https://www.calvinklein.co.kr/dw/image/v2/BGLQ_PRD/on/demandware.static/-/Library-Sites-calvin-klein-shared-library/default/dwe01b758f/ck_jeans-clp/Denim-Page-men-90s-jacket-jeans-CK-desktop.jpg" />
          </picture>
        </div>
        <div className={styles["brand-explain-textbox"]}>
          <p>
            Cozeans denim made in a sustainable way <br />
            with recycled cotton and low impact technology.
          </p>
          <p>
            You can create any style <br />
            while maintaining a comfortable silhouette.
          </p>
          <button>
            <Link to={`${ROOT_PATH}shop`}>BUY OUR JEANS</Link>
          </button>
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
            <input type="text" placeholder="Email Address" onChange={(e) => setNewslettersEmail(e.currentTarget.value)}></input>
            <button onClick={toggleFollowModal}>FOLLOW US</button>
          </div>
        </div>
      </section>
      <Modal toggleModal={toggleFollowModal} isOpen={isFollowModalOpen}>
        <h2>Thank you for follow us !</h2>
        <br />
        <h3>{newslettersEmail}&nbsp;,</h3>
        <p>
          We will notice our new season items <br />
          and promotions for you soon.
        </p>
        <img src={ringing} />
      </Modal>
    </div>
  );
};
