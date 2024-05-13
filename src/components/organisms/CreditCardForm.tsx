import { Box, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAddCreditCard } from "../../api/creditCard";
import { REGEXES } from "../../constants/regexes";
import { addSlash } from "../../helpers/addSlash";
import { addSpaces } from "../../helpers/addSpaces";
import { getTranslationKeyByCode } from "../../helpers/getTranslationKeyByCode";
import validateCardNumber from "../../helpers/validateCardNumber";
import { ValidateExpirationDate } from "../../helpers/validateExpirationDate";
import {
  CreditCardFormData,
  CreditCardFormFields,
  CreditCardRequestData,
} from "../../models/CreditCardData";
import ControlledTextField from "../atoms/ControlledTextField";
import LoadingButton from "../atoms/LoadingButton";
import StyledCard from "../atoms/StyledCard";

type CreditCardFormProps = ReturnType<typeof useAddCreditCard>;
const CreditCardForm = ({ ...props }: CreditCardFormProps) => {
  const { t } = useTranslation("translation", { keyPrefix: "creditCardModal" });
  const {
    addCreditCard,
    isAddCreditCardError,
    isAddCreditCardPending,
    isAddCreditCardSuccess,
    addCreditCardError,
  } = props;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreditCardFormData>({ mode: "all", delayError: 300 });

  const onSubmit = (data: CreditCardFormData) => {
    const { cardNumber, cardHolder, expirationDate, cvv } = data;
    const parsedData: CreditCardRequestData = {
      cardNumber: Number(cardNumber.replaceAll(" ", "")),
      cardHolder,
      expirationDate,
      cvv: Number(cvv),
    };
    addCreditCard(parsedData);
  };

  return (
    <StyledCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          name={CreditCardFormFields.CardNumber}
          fullWidth
          label={t("cardNumber")}
          variant="outlined"
          control={control}
          rules={{
            required: t("emptyField"),
            validate: (value) =>
              validateCardNumber(String(value), t("invalidCardNumber")),
          }}
          changeHandler={addSpaces}
          error={!!errors[CreditCardFormFields.CardNumber]}
          helperText={errors[CreditCardFormFields.CardNumber]?.message}
        />
        <ControlledTextField
          control={control}
          fullWidth
          label={t("cardHolder")}
          variant="outlined"
          name={CreditCardFormFields.CardHolder}
          rules={{
            required: t("emptyField"),
            pattern: {
              value: REGEXES.CARD_HOLDER,
              message: t("invalidCardHolder"),
            },
          }}
          error={!!errors[CreditCardFormFields.CardHolder]}
          helperText={errors[CreditCardFormFields.CardHolder]?.message}
        />
        <DateCvvBox>
          <DateTextField
            control={control}
            label={t("expirationDate")}
            variant="outlined"
            name={CreditCardFormFields.ExpirationDate}
            rules={{
              required: t("emptyField"),
              pattern: {
                value: REGEXES.EXPIRATION_DATE,
                message: t("invalidExpirationDate"),
              },
              validate: (value) =>
                ValidateExpirationDate(String(value), t("expiredCard")),
            }}
            onKeyUp={(e) => addSlash(e, setValue)}
            error={!!errors[CreditCardFormFields.ExpirationDate]}
            helperText={errors[CreditCardFormFields.ExpirationDate]?.message}
          />
          <CvvTextField
            control={control}
            label={t("cvv")}
            variant="outlined"
            name={CreditCardFormFields.Cvv}
            rules={{
              required: t("emptyField"),
              pattern: {
                value: REGEXES.CVV,
                message: t("invalidCvv"),
              },
            }}
            error={!!errors[CreditCardFormFields.Cvv]}
            helperText={errors[CreditCardFormFields.Cvv]?.message}
          />
        </DateCvvBox>
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          loading={isAddCreditCardPending}
          isSuccess={isAddCreditCardSuccess}
          isError={isAddCreditCardError}
        >
          {isAddCreditCardSuccess
            ? t("cardAdded")
            : addCreditCardError
            ? t(getTranslationKeyByCode(addCreditCardError.code) || "")
            : t("submit")}
        </LoadingButton>
      </form>
    </StyledCard>
  );
};

const DateTextField = styled(ControlledTextField)({
  width: "70%",
});

const CvvTextField = styled(ControlledTextField)({
  width: "25%",
});

const DateCvvBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export default CreditCardForm;
