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
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to={"/"}>
          <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
            Rooms Party
          </Typography>
        </Link>
        <NavbarInner
          onOpenLoginDialog={onOpenLoginDialog}
          onOpenRegisterDialog={onOpenRegisterDialog}
          openNav={openNav}
          setOpenNav={setOpenNav}
          user={userSlice}
        />
      </div>
      <Collapse open={openNav}>
        <NavbarMenu
          authorized={!!userSlice}
          collapsed
          onOpenLoginDialog={onOpenLoginDialog}
          onOpenRegisterDialog={onOpenRegisterDialog}
        />
      </Collapse>
    </Navbar>
  );
};

export default Header;
