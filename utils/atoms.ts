
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import Storage from "./storage";

export const tokenAtom = atomWithStorage<any | null>(
  "token",
  null,
  createJSONStorage(() => Storage)
);
