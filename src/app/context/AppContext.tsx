import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MOCK_USER, MOCK_PRODUCTS } from '../data/mock';

type CartItem = {
  productId: string;
  quantity: number;
};

interface AppContextType {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
  user: typeof MOCK_USER | null;
  cart: CartItem[];
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<typeof MOCK_USER | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const login = () => {
    setIsAuth(true);
    setUser(MOCK_USER);
    setLoginModalOpen(false);
  };

  const logout = () => {
    setIsAuth(false);
    setUser(null);
    setCart([]);
  };

  const addToCart = (productId: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { productId, quantity: qty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateCartQty = (productId: string, qty: number) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider
      value={{
        isAuth,
        login,
        logout,
        user,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        isLoginModalOpen,
        openLoginModal: () => setLoginModalOpen(true),
        closeLoginModal: () => setLoginModalOpen(false),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
