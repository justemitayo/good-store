
export interface CartItem {
  _id: string;
  cartId: string;
  name: string;
  category: string;
  price: number;
  cartQuantity: number;
  image: {
    url: string;
    publicId: string;
  };
  option: {
    title: string;
    value: string
  }[]
}

export interface AddCartItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  cartQuantity: number;
  image: {
    url: string;
    publicId: string;
  };
  option: {
    title: string;
    value: string
  }[]
}