export type OrderInfoModel = {
  amount: number;
  orderDate: number;
  status: string;
  user: string;
  customerInfo: {
    name: string;
    addressZonecode: string;
    address: string;
    addressDetail: string;
    phoneFirstNumber: string;
    phoneMiddleNumber: string;
    phoneLastNumber: string;
    email: string;
    message: string;
  };
};
