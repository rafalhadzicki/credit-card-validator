import { useMutation } from "@tanstack/react-query";
import { ApiPaths } from "../constants/paths";
import apiClient from "../helpers/apiClient";
import {
  CreditCardRequestData,
  CreditCardResponseData,
} from "../models/CreditCardData";

export const useAddCreditCard = () => {
  const {
    mutate: addCreditCard,
    isPending: isAddCreditCardPending,
    error: addCreditCardError,
    isSuccess: isAddCreditCardSuccess,
    isError: isAddCreditCardError,
    data: addCreditCardData,
  } = useMutation<
    CreditCardResponseData,
    CreditCardResponseData,
    CreditCardRequestData
  >({
    mutationFn: async (data) => {
      const res = await apiClient.post<
        CreditCardResponseData,
        CreditCardRequestData
      >(ApiPaths.AddCard, data);

      return res;
    },
  });
  return {
    addCreditCard,
    addCreditCardData,
    isAddCreditCardPending,
    addCreditCardError,
    isAddCreditCardSuccess,
    isAddCreditCardError,
  };
};
