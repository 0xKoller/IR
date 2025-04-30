import { create } from "zustand";

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface GovernmentId {
  type: string;
  number: string;
  expiryDate: string;
  file?: File;
}

export interface UserData {
  username: string;
  email: string;
  fullName: string;
  dateOfBirth: string;
  address: Address;
  governmentId: GovernmentId;
}

interface StoreState {
  userData: UserData;
  setUserData: (data: Partial<UserData>) => void;
  isInWallet: boolean[];
  setIsInWallet: (arr: boolean[]) => void;
  cardStackOrder: number[];
  setCardStackOrder: (order: number[]) => void;
}

const initialUserData: UserData = {
  username: "",
  email: "",
  fullName: "",
  dateOfBirth: "",
  address: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
  governmentId: {
    type: "",
    number: "",
    expiryDate: "",
  },
};

export const useGlobalStore = create<StoreState>(
  (
    set: (fn: (state: StoreState) => Partial<StoreState> | StoreState) => void
  ) => ({
    userData: initialUserData,
    setUserData: (data: Partial<UserData>) =>
      set((state) => ({ userData: { ...state.userData, ...data } })),
    isInWallet: [false, false, false],
    setIsInWallet: (arr: boolean[]) => set({ isInWallet: arr }),
    cardStackOrder: [0, 1, 2],
    setCardStackOrder: (order: number[]) => set({ cardStackOrder: order }),
  })
);
