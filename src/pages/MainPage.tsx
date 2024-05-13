import { useAddCreditCard } from "../api/creditCard";
import CreditCardForm from "../components/organisms/CreditCardForm";

const MainPage = () => {
  const addCreditCard = useAddCreditCard();
  return <CreditCardForm {...addCreditCard} />;
};

export default MainPage;
