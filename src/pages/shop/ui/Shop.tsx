import styles from "./Shop.module.scss";
import ProductCard from "../../../shared/productCard/ProductCard";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ROOT_PATH } from "../../../config";
import { ItemModel } from "../../../models/ItemModel";
import { useItems } from "../../../entities/items";
import { separateItems } from "../lib/separateItems";
import { sortItems } from "../lib/sortItems";

export const Shop = () => {
  const { page } = useParams();
  const itemsPerPage = 8; // 리스트 목록 개수 단위 설정
  const [currentPage, setCurrentPage] = useState(Number(page));
  const [sortMode, setSortMode] = useState("new");
  const [itemList, setItemList] = useState<ItemModel[]>([]);
  const { isPending, error, data } = useItems();

  const sortedItems = useMemo(() => sortItems(itemList, sortMode), [itemList, sortMode]);

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
            to={currentPage === 1 ? `${ROOT_PATH}shop/1` : `${ROOT_PATH}shop/${(currentPage - 1).toString()}`}
            onClick={() => (currentPage === 1 ? false : setCurrentPage(currentPage - 1))}
          >
            &lt;
          </Link>
          {separatedItems?.map((element: ItemModel, index: number) => (
            <Link
              to={`${ROOT_PATH}shop/${(index + 1).toString()}`}
              className={currentPage === index + 1 ? styles.emphasis : ""}
              onClick={() => setCurrentPage(index + 1)}
              key={index}
            >
              {index + 1}
            </Link>
          ))}
          <Link
            to={currentPage === separatedItems.length ? `${ROOT_PATH}shop/${separatedItems.length}` : `${ROOT_PATH}shop/${(currentPage + 1).toString()}`}
            onClick={() => (currentPage === separatedItems.length ? false : setCurrentPage(currentPage + 1))}
          >
            &gt;
          </Link>
        </div>
      </div>
    </div>
  );
};
