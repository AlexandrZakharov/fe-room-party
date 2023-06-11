import { FC, useState } from "react";
import AuthApiService from "@/services/api/auth/auth.service";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import useAppDispatch from "@/hooks/useAppDispatch";
import { setUserData } from "@/store/user/user.reducer";
import { useMutation } from "@tanstack/react-query";
import { AuthResponse } from "@/services/api/auth/auth.interface";
import { ErrorResponse } from "@/types/error.interface";
import { User } from "@/types/user.interface";

enum LoginInputType {
  EMAIL,
  PASSWORD,
}

type Props = {
  open: boolean;
  onOpenLoginDialog: () => void;
  onOpenRegisterDialog: () => void;
};

const LoginDialog: FC<Props> = ({
  open,
  onOpenLoginDialog,
  onOpenRegisterDialog,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();

  const { mutate, error, isLoading } = useMutation({
    mutationFn: AuthApiService.login,
    onSuccess: (data: User) => {
      dispatch(setUserData(data));
      onOpenLoginDialog();
    },
    onError: (error: ErrorResponse) => error,
  });

  const formStateController = {
    [LoginInputType.EMAIL]: setEmail,
    [LoginInputType.PASSWORD]: setPassword,
  };

  const handleChangeForm = (inputType: LoginInputType) => (event: any) =>
    formStateController[inputType](event.target.value);

  const handleLogin = (event: React.SyntheticEvent) => {
    mutate({ email, password });
    event.preventDefault();
  };

  const handleOpenRegisterDialog = () => {
    onOpenLoginDialog();
    onOpenRegisterDialog();
  };

  return (
    <Dialog
      size="xs"
      open={open}
      handler={onOpenLoginDialog}
      className="bg-transparent shadow-none min-w-full p-1 sm:min-w-[30rem]"
    >
      <Card className="mx-auto w-full">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-24 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              size="lg"
              error={!!error}
              value={email}
              disabled={isLoading}
              onChange={handleChangeForm(LoginInputType.EMAIL)}
            />
            <Input
              label="Password"
              type="password"
              size="lg"
              error={!!error}
              value={password}
              disabled={isLoading}
              onChange={handleChangeForm(LoginInputType.PASSWORD)}
            />
            <Typography>
              Don't have an account?{" "}
              <Button
                variant="text"
                size="sm"
                className="px-1"
                onClick={handleOpenRegisterDialog}
              >
                Sign Up
              </Button>
            </Typography>
            <ul className="list-disc list-inside">
              {error &&
                (Array.isArray(error?.message) ? (
                  error?.message.map((message) => (
                    <li className="text-red-600">{message}</li>
                  ))
                ) : (
                  <li className="text-red-600">{error?.message}</li>
                ))}
            </ul>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={handleLogin}
              fullWidth
              disabled={isLoading}
              type="submit"
              className="flex items-center justify-center gap-3"
            >
              <Spinner className="h-4 w-4" />
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Dialog>
  );
};

export default LoginDialog;
