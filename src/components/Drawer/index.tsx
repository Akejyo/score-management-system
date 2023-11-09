import { Divider, Drawer, useMediaQuery, useTheme } from "@mui/material";
import NavLinks from "./NavLinks";
import { useAppState } from "@/states";

const LeftDrawer = () => {
  const { state } = useAppState();
  //适配手机端
  const matchesMobile = useMediaQuery("(max-width:640px)");

  return (
    <>
      <Drawer
        variant={matchesMobile ? "temporary" : "persistent"}
        open={state.drawer}
        ModalProps={{
          keepMounted: matchesMobile,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
      >
        <NavLinks />
        <Divider />
      </Drawer>
    </>
  );
};

export default LeftDrawer;
