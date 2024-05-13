export const getTranslationKeyByCode = (code: number) => {
  switch (code) {
    case 200:
      return "cardAdded";
    case 400:
      return "invalidCard";
    case 500:
      return "serverError";
  }
};
