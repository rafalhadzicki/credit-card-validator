export type CreditCardFormData = {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
};
export type CreditCardRequestData = {
  cardNumber: number;
  cardHolder: string;
  expirationDate: string;
  cvv: number;
};

export type CreditCardResponseData = {
  code: number;
  message: string;
};

export enum CreditCardFormFields {
  CardNumber = "cardNumber",
  CardHolder = "cardHolder",
  ExpirationDate = "expirationDate",
  Cvv = "cvv",
}
