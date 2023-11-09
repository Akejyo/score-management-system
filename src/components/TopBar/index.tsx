import { Menu } from "@mui/icons-material";
import { AppBar, Badge, IconButton, Stack, Typography } from "@mui/material";
import { useAppState } from "@/states";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useQuery } from "react-query";
import { getCheckScore } from "@/apis/common";
import { useState } from "react";
import { CheckScoreInfo } from "@/common/interfaces/response";
import Link from "@/components/Link";
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

  const handleClick = () => {};

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
        <Stack direction="row" justifyContent="center" className="basis-1/2">
          <Link to="/">
            <Typography color={"white"}>成绩管理系统</Typography>
          </Link>
        </Stack>
        <IconButton size="large" color="inherit" onClick={handleClick}>
          <Link to="/check" color="inherit">
            <Badge badgeContent={checkRows.length} color="error">
              <NotificationsIcon />
            </Badge>
          </Link>
        </IconButton>
      </Stack>
    </AppBar>
  );
};

export default TopBar;
