import { formatNumberToCurrency } from "../../common";
import "./PriceDisplayer.module.scss";

const PriceDisplayer = (props: any) => {
  if (props.item.discountedPrice) {
    return (
      <p>
        <span>{formatNumberToCurrency(props.item.price * (props.item.quantity ? props.item.quantity : 1))} KRW</span>
        <br />
        <span>{formatNumberToCurrency(props.item.discountedPrice * (props.item.quantity ? props.item.quantity : 1))} KRW</span>
      </p>
    );
  } else {
    return (
      <p>
        <span></span>
        <span>{formatNumberToCurrency(props.item.price * (props.item.quantity ? props.item.quantity : 1))} KRW</span>
      </p>
    );
  }
};

export default PriceDisplayer;
