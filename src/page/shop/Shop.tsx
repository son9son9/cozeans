import "../../App.css";
import styles from "./Shop.module.scss";
import ProductCard from "../../component/productCard/ProductCard";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { sortByNew } from "../../common";
import { rootPath } from "../../config";
import { ItemModel } from "../../models/ItemModel";
import { useQuery } from "@tanstack/react-query";

// chunkUnit만큼 itemList를 잘라 chunkedList에 저장
const separateItems = (items: Array<ItemModel>, itemsPerPage: number): any => {
  let arr = [];
  for (let i = 0; i < items.length; i += itemsPerPage) {
    arr.push(items.slice(i, i + itemsPerPage));
  }
  return arr;
};
// 할인 중이면 할인가 반환, 아니면 정가 반환하는 함수
const decidedPrice = (item: ItemModel) => {
  if (item.discountedPrice) return item.discountedPrice;
  else return item.price;
};

const Shop = () => {
  const { page } = useParams();
  const itemsPerPage = 8; // 리스트 목록 개수 단위 설정
  const [currentPage, setCurrentPage] = useState(Number(page));
  const [sortMode, setSortMode] = useState("new");
  const [itemList, setItemList] = useState<ItemModel[]>([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["items"],
    queryFn: () => {
      return fetch("http://52.78.179.19:8080/items").then((res) => res.json());
    },
  });

  const sortedItems = useMemo(() => {
    if (!itemList.length) return [];
    const arr = [...itemList];

    if (sortMode === "new") {
      return sortByNew(arr);
    } else if (sortMode === "price-desc") {
      return arr.sort((a, b) => decidedPrice(b) - decidedPrice(a));
    } else if (sortMode === "price-asc") {
      return arr.sort((a, b) => decidedPrice(a) - decidedPrice(b));
    } else if (sortMode === "name-asc") {
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    }

    return arr;
  }, [itemList, sortMode]);

  const separatedItems = useMemo(() => {
    if (!data) return [];
    return separateItems(sortedItems, itemsPerPage);
  }, [sortedItems]);

  const handleUpdate = (mode: string): void => {
    setSortMode(mode);
  };

  useEffect(() => {
    if (data) {
      setItemList(data);
    }
  }, [data]);

  if (isPending) return <div className={`${styles.container} animate-after-render`}>Loading...</div>;
  if (error) return <div className={`${styles.container} animate-after-render`}>An error has occured: {error.message}</div>;
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
          {separatedItems[currentPage - 1]?.map((item: ItemModel, index: number) => (
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
          {separatedItems?.map((element: ItemModel, index: number) => (
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
            to={currentPage === separatedItems.length ? `${rootPath}shop/${separatedItems.length}` : `${rootPath}shop/${(currentPage + 1).toString()}`}
            onClick={() => (currentPage === separatedItems.length ? false : setCurrentPage(currentPage + 1))}
          >
            &gt;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shop;
