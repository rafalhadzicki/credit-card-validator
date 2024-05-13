import { Button, ButtonProps, CircularProgress } from "@mui/material";

type LoadingButtonProps = {
  isError?: boolean;
  isSuccess?: boolean;
  loading?: boolean;
} & ButtonProps;

const LoadingButton = ({
  children,
  isError,
  isSuccess,
  loading,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      color={isError ? "error" : isSuccess ? "success" : "primary"}
      {...props}
      disabled={loading}
    >
      {loading ? <CircularProgress /> : <>{children}</>}
    </Button>
  );
};

export default LoadingButton;
