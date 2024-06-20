import "../../App.css";
import styles from "./Shop.module.scss";
import ProductCard from "../../component/productCard/ProductCard";
import { Link, useParams } from "react-router-dom";
import { dataSample } from "../../dataSample";
import { useState } from "react";
import { sortByNew } from "../../common";

import { rootPath } from "../../config";
import { ItemModel } from "../../models/ItemModel";

// chunkUnit만큼 itemList를 잘라 chunkedList에 저장
const sliceList = (list: Array<ItemModel>, chunkUnit: number): any => {
  let arr = [];
  for (let i = 0; i < list.length; i += chunkUnit) {
    arr.push(list.slice(i, i + chunkUnit));
  }
  return arr;
};

const Shop = () => {
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(Number(page));
  const [sortMode, setSortMode] = useState("new");
  const [itemList, setItemList] = useState(() => {
    const arr = [...dataSample];
    return sortByNew(arr);
  });
  const [chunkUnit] = useState(8); // 리스트 목록 개수 단위 설정
  const [chunkedList, setChunkedList]: any = useState(sliceList(itemList, chunkUnit));

  // 할인 중이면 할인가 반환, 아니면 정가 반환하는 함수
  const decidedPrice = (item: ItemModel) => {
    if (item.discountedPrice) return item.discountedPrice;
    else return item.price;
  };

  const handleUpdate = (mode: string) => {
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
    setChunkedList(sliceList(arr, chunkUnit));
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
          {chunkedList[currentPage - 1].map((item: ItemModel, index: number) => (
            <ProductCard data={item} key={index} />
          ))}
        </div>
        <div className={styles.pagination}>
          <Link
            to={currentPage === 1 ? `${rootPath}shop/1` : `${rootPath}shop/${(currentPage - 1).toString()}`}
            onClick={() => (currentPage === 1 ? false : setCurrentPage(currentPage - 1))}
          >
            &lt;
          </Link>
          {chunkedList.map((element: ItemModel, index: number) => (
            <Link
              to={`${rootPath}shop/${(index + 1).toString()}`}
              className={currentPage === index + 1 ? styles.emphasis : ""}
              onClick={() => setCurrentPage(index + 1)}
              key={index}
            >
              {index + 1}
            </Link>
          ))}
          <Link
            to={currentPage === chunkedList.length ? `${rootPath}shop/${chunkedList.length}` : `${rootPath}shop/${(currentPage + 1).toString()}`}
            onClick={() => (currentPage === chunkedList.length ? false : setCurrentPage(currentPage + 1))}
          >
            &gt;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shop;
