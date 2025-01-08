import { useState } from "react";
import "../../App.css";
import ProductCard from "../../components/productCard/ProductCard";
import styles from "./Home.module.scss";
import { useEffect } from "react";
import { useRef } from "react";
import banner1 from "../../assets/banner-img1.webp";
import banner2 from "../../assets/banner-img2.webp";
import sample1 from "../../assets/sample1.png";
import sample2 from "../../assets/sample2.png";
import sample3 from "../../assets/sample3.png";
import sample4 from "../../assets/sample4.png";
import { Link } from "react-router-dom";
import { sortByNew } from "../../common";
import Modal from "../../components/modal/Modal";
import ringing from "../../assets/ringing.png";
import { ROOT_PATH, SERVER_PATH } from "../../config";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { ItemModel } from "../../models/ItemModel";
import { LoginSessionModel } from "../../models/LoginSessionModel";
import { loginSessionActions } from "../../store";

const Home = () => {
  const loginSession: LoginSessionModel = useSelector((state: any) => state.loginSession.value);
  const marqueeRef: any = useRef();
  const [vpWidth, setVpWidth]: any = useState();
  const [offsetWidth, setOffsetWidth] = useState();
  const [numOfElement, setNumOfElement] = useState(0);
  const [circulateBannerFlag, setCirculateBannerFlag] = useState(1);
  const [beltText, setBeltText] = useState();
  const items = useSelector((state: any) => state.items.value);
  // useSelector로 받아온 데이터는 read only, 따라서 값 복사해서 변경해야 함.
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [newslettersEmail, setNewslettersEmail]: any = useState();
  const dispatch = useDispatch();

  const toggleFollowModal = () => {
    if (!newslettersEmail) {
      return false;
    }
    setIsFollowModalOpen(!isFollowModalOpen);
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["hypedItems"],
    queryFn: async () => {
      return await fetch(`${SERVER_PATH}items`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          // skip ngrok warning
          "ngrok-skip-browser-warning": "69420",
        },
      }).then((res) => res.json());
    },
    select: (data: ItemModel[]) => sortByNew([...data]).slice(0, 5),
    retry: false,
  });

  const sessionCheck = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      return await fetch(`${SERVER_PATH}session-info?session-id=${loginSession.sessionId}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          // skip ngrok warning
          "ngrok-skip-browser-warning": "69420",
        },
      }).then((res) => res.json());
    },
    retry: false,
    enabled: false,
  });
  // 메인 페이지에서 현재 로그인된 세션 체크,
  // 비로그인 상태 시 persist 상태 로그아웃으로 변경
  useEffect(() => {
    if (sessionCheck.data) {
      setTimeout(() => {
        sessionCheck.refetch().then((res) => {
          if (res.data) {
            if (res.data.success === false) {
              dispatch(loginSessionActions.logout());
            }
          }
        });
      }, 200);
    }
  }, [sessionCheck.data]);

  // 배너 무한 스크롤 텍스트 복제
  useEffect(() => {
    // 뷰포트, 전광판 텍스트 길이 구하기
    setVpWidth(document.documentElement.clientWidth);
    setOffsetWidth(marqueeRef.current.offsetWidth);

    // 복제할 텍스트 개수 구하기
    let count = 1;
    let totalWidth: any = offsetWidth;

    while (totalWidth < vpWidth + offsetWidth) {
      totalWidth += offsetWidth;
      count++;
    }
    setNumOfElement(count);

    // 텍스트 복제
    const numArray: any = Array.from({ length: numOfElement }, (_, i) => i + 1);
    setBeltText(
      numArray.map((i: any) => {
        return <div key={i}>SITEWIDE SALE / SUMMER 2024 UP TO 30% OFF 100 BONUS POINTS ON PURCHASES OVER $300</div>;
      })
    );
  }, [vpWidth, offsetWidth, numOfElement]);

  // 10초마다 배너 전광판 이미지 교체
  useEffect(() => {
    setTimeout(() => {
      setCirculateBannerFlag(circulateBannerFlag === 1 ? 2 : 1);
    }, 5000);
  }, [circulateBannerFlag]);

  return (
    <div className={`${styles.container} animate-after-render`}>
      <div className={styles.bannerbox}>
        <div className={styles.banner}>
          <div className={styles["banner-img-wrapper"]}>
            <img src={banner1} className={`${circulateBannerFlag === 1 ? styles.hype : ""} animate-after-render`} />
            <img src={banner2} className={circulateBannerFlag === 2 ? styles.hype : ""} />
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
            {beltText}
            <div>SITEWIDE SALE / SUMMER 2024 UP TO 30% OFF 100 BONUS POINTS ON PURCHASES OVER $300</div>
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

export default Home;
