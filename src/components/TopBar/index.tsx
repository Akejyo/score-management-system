import { Menu } from "@mui/icons-material";
import { AppBar, IconButton, Stack, Typography } from "@mui/material";
import { useAppState } from "@/states";

const TopBar = () => {
  const { state, dispatch } = useAppState();

  const changeMenu = () => {
    dispatch({
      type: "set drawer",
    });
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Stack direction="row" alignItems="center" className="px-6">
        <Stack direction="row" className="basis-1/4" alignItems="center">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={changeMenu}
          >
            <Menu />
          </IconButton>
        </Stack>
        <Stack direction="row" justifyContent="center" className="basis-1/2">
          <Typography>test</Typography>
        </Stack>
      </Stack>
    </AppBar>
  );
};

export default TopBar;
