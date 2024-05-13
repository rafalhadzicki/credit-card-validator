import { ChangeEvent } from "react";

export const addSpaces = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  let valueWithoutSpaces = e.target.value.split(" ").join("");
  if (valueWithoutSpaces.length > 4) {
    valueWithoutSpaces = valueWithoutSpaces.match(/.{1,4}/g)?.join(" ") || "";
  }
  e.target.value = valueWithoutSpaces;
};
