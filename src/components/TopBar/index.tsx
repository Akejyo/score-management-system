import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Theme, useAppState } from "@/states";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useQuery } from "react-query";
import { getCheckScore } from "@/apis/common";
import { useState } from "react";
import { CheckScoreInfo } from "@/common/interfaces/response";
import Link from "@/components/Link";
import { deepOrange } from "@mui/material/colors";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const TopBar = () => {
  const { state, dispatch } = useAppState();

  const changeMenu = () => {
    dispatch({
      type: "set drawer",
    });
  };

  const [checkRows, setCheckRows] = useState<CheckScoreInfo[]>([]);
  const { data } = useQuery("getCheckScore", () => getCheckScore(), {
    onSuccess: (data: any) => {
      // console.log(data);
      setCheckRows(data.checkRows);
    },
  });

  const logoImg = new URL(
    `../../assets/logo.png`,
    import.meta.url
  ).href.toString();

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
            sx={{ mx: 2, pt: 1, pb: 1 }}
            onClick={changeMenu}
          >
            <Menu />
          </IconButton>
        </Stack>
        <Link to="/">
          <img
            src={logoImg}
            alt="logo"
            style={{
              height: "50px",
              width: "auto",
              marginRight: "20px",
            }}
          />
        </Link>
        <Box sx={{ flexGrow: 1 }}></Box>
        <IconButton
          size="large"
          color="inherit"
          onClick={() => {
            if (state.theme === "light") {
              dispatch({
                type: "set theme",
                payload: "dark" as Theme,
              });
            } else {
              dispatch({
                type: "set theme",
                payload: "light" as Theme,
              });
            }
          }}
        >
          {state.theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <IconButton size="large" color="inherit" sx={{ mr: 2 }}>
          <Link to="/check" color="inherit">
            <Badge badgeContent={checkRows.length} color="error">
              <NotificationsIcon />
            </Badge>
          </Link>
        </IconButton>
        <Avatar sx={{ bgcolor: deepOrange[500], mr: 2 }}>李</Avatar>
      </Stack>
    </AppBar>
  );
};

export default TopBar;
