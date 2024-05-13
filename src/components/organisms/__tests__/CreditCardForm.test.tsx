import { fireEvent, render, waitFor } from "@testing-library/react";
import { useAddCreditCard } from "../../../api/creditCard";
import CreditCardForm from "../CreditCardForm";

jest.mock("../../../api/creditCard");

describe("CreditCardForm", () => {
  const mockUseAddCreditCard = useAddCreditCard as jest.MockedFunction<
    typeof useAddCreditCard
  >;

  beforeEach(() => {
    mockUseAddCreditCard.mockReturnValue({
      addCreditCard: jest.fn(),
      addCreditCardData: undefined,
      addCreditCardError: null,
      isAddCreditCardPending: false,
      isAddCreditCardError: false,
      isAddCreditCardSuccess: false,
    });
  });

  it("renders correctly", () => {
    const { getByLabelText } = render(
      <CreditCardForm {...mockUseAddCreditCard()} />
    );
    expect(getByLabelText("cardNumber")).toBeInTheDocument();
    expect(getByLabelText("expirationDate")).toBeInTheDocument();
  });

  it("does not call addCreditCard when fields are empty", async () => {
    const { getByRole } = render(
      <CreditCardForm {...mockUseAddCreditCard()} />
    );
    const submitButton = getByRole("button", { name: /submit/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUseAddCreditCard().addCreditCard).not.toHaveBeenCalled();
    });
  });

  it("calls addCreditCard when fields are filled", async () => {
    const { getByRole, getByLabelText } = render(
      <CreditCardForm {...mockUseAddCreditCard()} />
    );
    const submitButton = getByRole("button", { name: /submit/i });

    fireEvent.change(getByLabelText("cardNumber"), {
      target: { value: "3782 8224 6310 005" },
    });
    fireEvent.change(getByLabelText("cardHolder"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText("expirationDate"), {
      target: { value: "12/28" },
    });
    fireEvent.change(getByLabelText("cvv"), { target: { value: "123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUseAddCreditCard().addCreditCard).toHaveBeenCalled();
    });
  });

  it("shows error message when credit card is expired", async () => {
    const { getByRole, getByLabelText, getByText } = render(
      <CreditCardForm {...mockUseAddCreditCard()} />
    );
    const submitButton = getByRole("button", { name: /submit/i });

    fireEvent.change(getByLabelText("cardNumber"), {
      target: { value: "3782 8224 6310 005" },
    });
    fireEvent.change(getByLabelText("cardHolder"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText("expirationDate"), {
      target: { value: "12/20" },
    });
    fireEvent.change(getByLabelText("cvv"), { target: { value: "123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText(/expired/i)).toBeInTheDocument();
    });
  });
});
