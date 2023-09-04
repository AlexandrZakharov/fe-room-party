import useAppSelector from "@/hooks/useAppSelector";
import { selectUserData } from "@/store/user/user.reducer";
import { Collapse, Navbar, Typography } from "@material-tailwind/react";
import { FC, useState } from "react";
import NavbarInner from "./components/NavbarInner/NavbarInner";
import NavbarMenu from "./components/NavbarMenu/NavbarMenu";
import { Link } from "react-router-dom";

type Props = {
  onOpenRegisterDialog: () => void;
  onOpenLoginDialog: () => void;
};

const Header: FC<Props> = ({ onOpenRegisterDialog, onOpenLoginDialog }) => {
  const [openNav, setOpenNav] = useState(false);

  const userSlice = useAppSelector(selectUserData);

  return (
    <Navbar className="max-w-full rounded-none">

    </Navbar>
  );
};

export default Header;
