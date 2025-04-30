import { create } from "zustand";

export interface Address {
  country: string;
}

export interface GovernmentId {
  type: string;
  number: string;
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
    country: "",
  },
  governmentId: {
    type: "",
    number: "",
  },
};

export const useGlobalStore = create<StoreState>((set) => ({
  userData: initialUserData,
  setUserData: (data: Partial<UserData>) =>
    set((state) => ({ userData: { ...state.userData, ...data } })),
  isInWallet: [false, false, false],
  setIsInWallet: (arr: boolean[]) =>
    set((state) => ({ ...state, isInWallet: arr })),
  cardStackOrder: [0, 1, 2],
  setCardStackOrder: (order: number[]) =>
    set((state) => ({ ...state, cardStackOrder: order })),
}));
