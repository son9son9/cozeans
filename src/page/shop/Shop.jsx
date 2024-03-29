import "../../App.css";
import styles from "./Shop.module.scss";
import ProductCard from "../../component/productCard/ProductCard";
import { Link } from "react-router-dom";

const Shop = () => {
  return (
    <div className={styles.container}>
      <div className={styles["product-list-wrapper"]}>
        <div className={styles["sort-box"]}>
          Sort by :{" "}
          <Link to="" className={styles.emphasis}>
            New
          </Link>
          |<Link to="">Price</Link>|<Link to="">Rating</Link>
        </div>
        <div className={styles["product-list"]}>
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
