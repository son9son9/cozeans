import "../../App.css";
import styles from "./Shop.module.scss";
import ProductCard from "../../component/productCard/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import { dataSample } from "../../dataSample";
import { useState } from "react";
import { useEffect } from "react";

const Shop = (props) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortMode, setSortMode] = useState("new");
  const [itemList, setItemList] = useState(
    dataSample.sort((a, b) => {
      // 날짜가 클수록 최신 상품이기 때문에 앞순서에 정렬
      if (a.registrationDate > b.registrationDate) return -1;
      // 등록날짜가 같다면 id가 뒷순서인 상품이 최신이기 때문에 id값이 큰 상품을 앞순서로 정렬
      else if (a.registrationDate == b.registrationDate) {
        if (a.id > b.id) return -1;
        else if (a.id < b.id) return 1;
      } else if (a.registrationDate < b.registrationDate) return 1;
      else return 0;
    })
  );

  const displayPriceHandler = (item) => {
    if (item.discountedPrice) {
      return (
        <p>
          <span>{item.price} KRW</span>
          <br />
          <span>{item.discountedPrice} KRW</span>
        </p>
      );
    } else {
      return (
        <p>
          <span></span>
          <span>{item.price} KRW</span>
        </p>
      );
    }
  };

  // 할인 중이면 할인가 반환, 아니면 정가 반환하는 함수
  const decidedPrice = (item) => {
    if (item.discountedPrice) return item.discountedPrice;
    else return item.price;
  };

  const handleUpdate = (mode) => {
    const array = [...dataSample];

    if (mode === "new") {
      setItemList(
        array.sort((a, b) => {
          // 날짜가 클수록 최신 상품이기 때문에 앞순서에 정렬
          if (a.registrationDate > b.registrationDate) return -1;
          // 등록날짜가 같다면 id가 뒷순서인 상품이 최신이기 때문에 id값이 큰 상품을 앞순서로 정렬
          else if (a.registrationDate == b.registrationDate) {
            if (a.id > b.id) return -1;
            else if (a.id < b.id) return 1;
          } else if (a.registrationDate < b.registrationDate) return 1;
          else return 0;
        })
      );
      // 가격 내림차순 정렬
    } else if (mode === "price-desc") {
      setItemList(
        array.sort((a, b) => {
          if (decidedPrice(a) > decidedPrice(b)) {
            return -1;
          } else if (decidedPrice(a) < decidedPrice(b)) {
            return 1;
          } else return 0;
        })
      );
      // 가격 오름차순 정렬
    } else if (mode === "price-asc") {
      setItemList(
        array.sort((a, b) => {
          if (decidedPrice(a) < decidedPrice(b)) {
            return -1;
          } else if (decidedPrice(a) > decidedPrice(b)) {
            return 1;
          } else return 0;
        })
      );
      // 이름 오름차순 정렬
    } else if (mode === "name-asc") {
      setItemList(
        array.sort((a, b) => {
          if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
          } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
          } else return 0;
        })
      );
    }

    setSortMode(mode);
  };

  return (
    <div className={`${styles.container} animate-after-render`}>
      <div className={styles["product-list-wrapper"]}>
        <div className={styles["sort-box"]}>
          Sort by&nbsp;&nbsp;&nbsp;:&nbsp;
          <div
            className={`${sortMode === "new" ? styles.emphasis : ""}`}
            onClick={() => {
              handleUpdate("new");
            }}
          >
            New
          </div>
          |
          <div
            className={`${sortMode === "price-desc" ? styles.emphasis : ""}`}
            onClick={() => {
              handleUpdate("price-desc");
            }}
          >
            Price{sortMode === "price-desc" && ` ▼`}
          </div>
          |
          <div
            className={`${sortMode === "name-asc" ? styles.emphasis : ""}`}
            onClick={() => {
              handleUpdate("name-asc");
            }}
          >
            Name{sortMode === "name-asc" && ` ▲`}
          </div>
        </div>
        <div className={styles["product-list"]}>
          {itemList.map((item, index) => (
            <ProductCard name={<p>{item.name}</p>} price={displayPriceHandler(item)} src={item.thumbnail} key={index} />
          ))}
        </div>
        <div className={styles.pagination}>
          <Link to="">&lt;</Link>
          <Link to="" className={styles.emphasis}>
            1
          </Link>
          <Link to="">2</Link>
          <Link to="">3</Link>
          <Link to="">4</Link>
          <Link to="">5</Link>
          <Link to="">&gt;</Link>
        </div>
      </div>
    </div>
  );
};

export default Shop;
