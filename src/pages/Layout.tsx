import { Box, Stack, useMediaQuery } from "@mui/material";
import TopBar from "@/components/TopBar";
import Drawer from "@/components/Drawer";
import { Outlet } from "react-router-dom";
import { useAppState } from "@/states";
import Aside from "@/components/Aside";

const Layout = () => {
  const { state, dispatch } = useAppState();
  const matches = useMediaQuery("(min-width: 1720px)");
  const drawerWidth = 210;

  return (
    <>
      <Box className="relative flex h-full">
        <TopBar />
        <Drawer />
        <Box
          component="main"
          className={`flex w-full flex-col items-center align-middle transition-all`}
          sx={{
            marginLeft: {
              sm: `${state.drawer && !matches ? drawerWidth : 0}px`,
            },
          }}
        >
          <Stack direction={"row"}>
            <Box
              id="detail"
              className="h-full w-full max-w-screen-xl flex-1 p-4"
              sx={{ flexGrow: 1 }}
            >
              <Outlet />
            </Box>
            <Aside />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
