import "./barnav.less";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useFetchUserAccountQuery } from "../features/user/userSlice";
import FlyMenu from "./FlyMenu";
import "./flyoutMenu.less";
export default function FlyoutMenu({ token }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: me, isLoading, isError } = useFetchUserAccountQuery();

  if (isLoading) {
    return;
  }
  if (isError) {
    return;
  };

  return (
    <>
      <div className="menu" onClick ={() => setIsOpen(!isOpen)}>
          <MenuIcon />
      </div>
      {isOpen && <FlyMenu token={token} me={me} setIsOpen={setIsOpen} isOpen={isOpen} />}
    </>
  );
}
