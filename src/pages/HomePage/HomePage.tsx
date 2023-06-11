import { useState } from "react";
import RegisterDialog from "@/components/dialogs/RegisterDialog/RegisterDialog";
import LoginDialog from "@/components/dialogs/LoginDialog/LoginDialog";
import Header from "@/components/Header/Header";

const HomePage = () => {
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const [openLogin, setOpenLogin] = useState<boolean>(false);

  const handleOpenRegister = () => setOpenRegister(!openRegister);
  const handleOpenLogin = () => setOpenLogin(!openLogin);

  return (
    <>
      <Header onOpenRegisterDialog={handleOpenRegister} onOpenLoginDialog={handleOpenLogin} />
      <RegisterDialog open={openRegister} onOpenRegisterDialog={handleOpenRegister} onOpenLoginDialog={handleOpenLogin}/>
      <LoginDialog open={openLogin} onOpenLoginDialog={handleOpenLogin} onOpenRegisterDialog={handleOpenRegister} />
    </>
  );
};

export default HomePage;
