import { KeyboardEvent } from "react";
import { UseFormSetValue } from "react-hook-form";
import {
  CreditCardFormData,
  CreditCardFormFields,
} from "../models/CreditCardData";

export const addSlash = (
  e: KeyboardEvent<HTMLDivElement>,
  setValue: UseFormSetValue<CreditCardFormData>
) => {
  const target = e.target as HTMLInputElement;
  if (target.value.length === 2 && e.key !== "Backspace" && e.key !== "/") {
    setValue(CreditCardFormFields.ExpirationDate, `${target.value}/`);
  }
};
