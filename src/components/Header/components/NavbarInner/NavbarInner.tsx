import { FC } from "react";
import BurgerButton from "../BurgerButton/BurgerButton";
import NavbarMenu from "../NavbarMenu/NavbarMenu";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { User } from "@/types/user.interface";

type Props = {
  openNav: boolean;
  onOpenRegisterDialog: () => void;
  onOpenLoginDialog: () => void;
  setOpenNav: (openNav: boolean) => void;
  userSlice: User | null;
};

const NavbarInner: FC<Props> = ({
  onOpenRegisterDialog,
  onOpenLoginDialog,
  openNav,
  setOpenNav,
  userSlice
}) => {
  return (
    <>
      <div className="hidden gap-2 lg:flex">
        <NavbarMenu
          collapsed={false}
          authorized={!!userSlice}
          onOpenLoginDialog={onOpenLoginDialog}
          onOpenRegisterDialog={onOpenRegisterDialog}
        />
      </div>
      <BurgerButton openNav={openNav} setOpenNav={setOpenNav} />
      {userSlice && <ProfileMenu data={userSlice} />}
    </>
  );
};

export default NavbarInner;
