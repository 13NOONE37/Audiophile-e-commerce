import { Dispatch, SetStateAction, createContext } from 'react';

export type CartItemType = {
  slug: string;
  quantity: number;
};
const CartContext = createContext<{
  items: CartItemType[];
  setItems: Dispatch<SetStateAction<CartItemType[]>>;
}>({
  items: [],
  setItems: () => {},
});

export default CartContext;
