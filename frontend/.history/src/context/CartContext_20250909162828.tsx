// src/context/CartContext.tsx
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CartApi } from '../api/endpoints';
import { ShoppingCartDto } from '../types/api';

interface CartValue {
  cart: ShoppingCartDto | null;
  add: (id: number) => Promise<void>;
  remove: (id: number) => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartValue>({} as CartValue);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ShoppingCartDto | null>(null);

  const refresh = async () => {
    const { data } = await CartApi.me();
    setCart(data);
  };

  useEffect(() => {
    refresh().catch(() => null);
  }, []);

  const add = async (id: number) => {
    const { data } = await CartApi.add(id);
    setCart(data);
  };

  const remove = async (id: number) => {
    const { data } = await CartApi.remove(id);
    setCart(data);
  };

  return (
    <CartContext.Provider value={{ cart, add, remove, refresh }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);