import "../../App.css";
import styles from "./Shop.module.scss";
import ProductCard from "../../component/productCard/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import { dataSample } from "../../dataSample";
import { useState } from "react";
import { displayPriceHandler, sortByNew } from "../../common";

const Shop = (props) => {
  // const navigate = useNavigate();
  // const [currentPage, setCurrentPage] = useState(1);
  const [sortMode, setSortMode] = useState("new");
  const [itemList, setItemList] = useState(() => {
    const arr = [...dataSample];
    return sortByNew(arr);
  });

  // 할인 중이면 할인가 반환, 아니면 정가 반환하는 함수
  const decidedPrice = (item) => {
    if (item.discountedPrice) return item.discountedPrice;
    else return item.price;
  };

  const handleUpdate = (mode) => {
    const arr = [...dataSample];

    if (mode === "new") {
      setItemList(sortByNew(arr));
      // 가격 내림차순 정렬
    } else if (mode === "price-desc") {
      setItemList(
        arr.sort((a, b) => {
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
        arr.sort((a, b) => {
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
        arr.sort((a, b) => {
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
