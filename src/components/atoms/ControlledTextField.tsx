import { TextField, TextFieldProps, styled } from "@mui/material";
import { ChangeEvent } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { CreditCardFormData } from "../../models/CreditCardData";

type ControlledTextFieldProps = TextFieldProps &
  UseControllerProps<CreditCardFormData> & {
    changeHandler?: (
      e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void;
  };

const ControlledTextField = ({
  control,
  name,
  rules,
  changeHandler,
  ...props
}: ControlledTextFieldProps) => {
  const { field } = useController({ control, name, rules, defaultValue: "" });
  const handleOnChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    changeHandler && changeHandler(e);
    field.onChange(e);
  };
  return (
    <StyledTextField
      onChange={handleOnChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      inputRef={field.ref}
      {...props}
    />
  );
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

export default ControlledTextField;
