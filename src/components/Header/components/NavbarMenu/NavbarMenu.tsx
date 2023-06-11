import { Button } from "@material-tailwind/react";
import axios from "axios";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  collapsed: boolean;
  authorized: boolean;
  onOpenLoginDialog: () => void;
  onOpenRegisterDialog: () => void;
};

const NavbarMenu: FC<Props> = ({
  collapsed,
  authorized,
  onOpenLoginDialog,
  onOpenRegisterDialog,
}) => {
  const checkRooms = () => {
    axios.post(
      "http://193.42.110.148:3000/api/room",
      {
        title: "kek",
        link: "https://github.com/Boost-Technologies/fe-boostbypro/blob/master/src/App.tsx",
      },
      { withCredentials: true }
    );
  };

  return (
    <>
      {authorized ? (
        <Button
          variant="text"
          size="sm"
          fullWidth={collapsed}
          className={collapsed ? "mb-2" : ""}
          color="blue-gray"
          onClick={checkRooms}
        >
          Rooms
        </Button>
      ) : (
        <>
          <Button
            variant="text"
            size="sm"
            fullWidth={collapsed}
            color="blue-gray"
            className={collapsed ? "mb-2" : ""}
            onClick={onOpenLoginDialog}
          >
            Sign In
          </Button>
          <Button
            variant="gradient"
            size="sm"
            fullWidth={collapsed}
            className={collapsed ? "mb-2" : ""}
            onClick={onOpenRegisterDialog}
          >
            Sign Up
          </Button>
        </>
      )}
    </>
  );
};

export default NavbarMenu;
