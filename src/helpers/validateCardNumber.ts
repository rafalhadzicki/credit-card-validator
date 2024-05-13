const validateCardNumber = (cardNumber: string, errMessage: string) => {
  let sum = 0;
  let isEven = false;
  const parsedCardNumber = cardNumber.split(" ").join("");

  for (let i = parsedCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(parsedCardNumber.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0 ? true : errMessage;
};

export default validateCardNumber;
