import { atom } from "recoil";

export const todoAtom = atom({
  key: "todoList",
  default: ["kimchi", "pizza", "pasta", "apple pie", "coffee"],
});
