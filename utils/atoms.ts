import { atomWithStorage, createJSONStorage } from "jotai/utils";
import Storage from "./storage";
import { atom } from "jotai";

export const tokenAtom = atomWithStorage<any | null>(
  "token",
  null,
  createJSONStorage(() => Storage)
);

export const bookAtom = atom({
  bookId: "",
  bookName: "",
  bookSellerId: "",
  bookSeller: "",
});
export const messageIdAtom = atom('');
