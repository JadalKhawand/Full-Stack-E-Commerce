import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CommerceStore {
  token: string;
  setToken: (token: string) => void;
  cart: {};
  emptyCart: () => void;
  addOneToCart: (productId: string) => void;
  subtractOneFromCart: (productId: string) => void;
  favoritesToggled: Boolean;
  toggleFavoritesFilter: () => void;
  searchFilter: string;
  setSearchFilter: (searchString: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  productSorting: 1 | -1;
  setProductSorting: (sorting: number) => void;
  userName: string;
  setUserName: (userName: string) => void;
  userEmail: string;
  setUserEmail: (userEmail: string) => void;
  userPassword: string;
  setUserPassword: (userPassword: string) => void;
  userConfirmPassword: string;
  setUserConfirmPassword: (userConfirmPassword: string) => void;

  showCart: boolean;
  setShowCart: (value: boolean) => void;
  showConfimModal: boolean;
  setShowConfirmModal: (value: boolean) => void;
  onCancel: Function;
  setOnCancel: (callback: Function) => void;
  onConfirm: Function;
  setOnConfirm: (callback: Function) => void;
  confirmModalMessage: string;
  setConfirmModalMessage: (message: string) => void;
  showReviewModal: boolean;
  setShowReviewModal: (value: boolean) => void;
  productBeingReviewed: any;
  setProductBeingReviewed: (product: any) => void;
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
}

export const useCommerceStore = create<CommerceStore>(
  // @ts-ignore
  persist((set, get) => ({
    token: "",
    setToken: (token) => set((state) => ({ token: token })),
    cart: {},
    emptyCart: () =>
      set((state) => {
        return { cart: {} };
      }),
    addOneToCart: (productId) =>
      set((state: any) => {
        if (!productId || "undefined" === productId) {
          return state.cart;
        }
      }),
  }),
  {
    name: 'mern-ecom-app', // name of the item in the storage (must be unique)
},
  )
);
