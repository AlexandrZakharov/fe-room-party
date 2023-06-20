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
  Typography,
} from "@material-tailwind/react";
import useAppDispatch from "@/hooks/useAppDispatch";
import { useMutation } from "@tanstack/react-query";
import { ErrorResponse } from "@/types/error.interface";
import { AuthResponse } from "@/services/api/auth/auth.interface";
import { setUserData } from "@/store/user/user.reducer";
import { User } from "@/types/user.interface";

enum RegisterInputType {
  NAME,
  EMAIL,
  PASSWORD,
}

type Props = {
  open: boolean;
  onOpenLoginDialog: () => void;
  onOpenRegisterDialog: () => void;
};

const RegisterDialog: FC<Props> = ({
  open,
  onOpenLoginDialog,
  onOpenRegisterDialog,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const { mutate, error, isLoading } = useMutation({
    mutationFn: AuthApiService.register,
    onSuccess: (data: User) => {
      dispatch(setUserData(data));
      onOpenRegisterDialog();
    },
    onError: (error: ErrorResponse) => error,
  });

  const formStateController = {
    [RegisterInputType.NAME]: setName,
    [RegisterInputType.EMAIL]: setEmail,
    [RegisterInputType.PASSWORD]: setPassword,
  };

  const handleChangeForm = (inputType: RegisterInputType) => (event: any) =>
    formStateController[inputType](event.target.value);

  const handleRegister = async (event: React.SyntheticEvent) => {
    mutate({ email, password, name });
    event.preventDefault();
  };

  const handleOpenLoginDialog = () => {
    onOpenRegisterDialog();
    onOpenLoginDialog();
  };

  return (
    <Dialog
      size="xs"
      open={open}
      handler={onOpenRegisterDialog}
      className="bg-transparent shadow-none min-w-full p-1 sm:min-w-[30rem]"
    >
      <Card className="mx-auto w-full">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-24 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              size="lg"
              value={email}
              error={!!error}
              disabled={isLoading}
              autoComplete="new-password"
              onChange={handleChangeForm(RegisterInputType.EMAIL)}
            />
            <Input
              label="Name"
              size="lg"
              value={name}
              error={!!error}
              disabled={isLoading}
              autoComplete="new-password"
              onChange={handleChangeForm(RegisterInputType.NAME)}
            />
            <Input
              label="Password"
              type="password"
              size="lg"
              value={password}
              error={!!error}
              disabled={isLoading}
              autoComplete="new-password"
              onChange={handleChangeForm(RegisterInputType.PASSWORD)}
            />
            <Typography>
              Already have an account?{" "}
              <Button
                variant="text"
                size="sm"
                className="px-1"
                onClick={handleOpenLoginDialog}
              >
                Sign In
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
              onClick={handleRegister}
              fullWidth
              disabled={isLoading}
              type="submit"
            >
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Dialog>
  );
};

export default RegisterDialog;
