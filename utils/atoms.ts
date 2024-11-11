import { atom } from "jotai";
import { atomWithStorage, createJSONStorage, atomWithReset } from "jotai/utils";
import Storage from "./storage";

export const tokenAtom = atomWithStorage<any | null>(
  "token",
  null,
  createJSONStorage(() => Storage)
);
