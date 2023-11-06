import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import NavLinks from "./NavLinks";
import { useAppState } from "@/states";

const LeftDrawer = () => {
  const { state } = useAppState();

  const matchesMobile = useMediaQuery("(max-width:640px)");

  return (
    <>
      <Drawer open={state.drawer}>
        <NavLinks />
      </Drawer>
    </>
  );
};

export default LeftDrawer;
