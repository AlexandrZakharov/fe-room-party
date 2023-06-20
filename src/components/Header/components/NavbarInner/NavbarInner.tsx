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
  user: User | null;
};

const NavbarInner: FC<Props> = ({
  onOpenRegisterDialog,
  onOpenLoginDialog,
  openNav,
  setOpenNav,
  user
}) => {
  return (
    <>
      <div className="hidden gap-2 lg:flex">
        <NavbarMenu
          collapsed={false}
          authorized={!!user}
          onOpenLoginDialog={onOpenLoginDialog}
          onOpenRegisterDialog={onOpenRegisterDialog}
        />
      </div>
      <BurgerButton openNav={openNav} setOpenNav={setOpenNav} />
      {user && <ProfileMenu data={user} />}
    </>
  );
};

export default NavbarInner;
