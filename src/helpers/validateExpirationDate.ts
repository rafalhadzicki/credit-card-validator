import dayjs from "dayjs";

export const ValidateExpirationDate = (
  expirationDate: string,
  errMessage: string
) => {
  const stringValue = String(expirationDate);
  const [month, year] = stringValue.split("/");
  const inputDate = dayjs(`20${year}-${month}-01`);
  const todayDate = dayjs();

  if (inputDate.isBefore(todayDate)) {
    return errMessage;
  }
  return true;
};
