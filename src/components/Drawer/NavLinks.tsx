import React, { useState } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";

const Ordinate = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
        <ListItemText>
          <Typography color="inherit" className="font-bold">
            tmp
          </Typography>
        </ListItemText>
        {open ? (
          <ExpandLess fontSize="inherit" />
        ) : (
          <ExpandMore fontSize="inherit" />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
            <ListItemText>
              <Typography color="inherit" className="font-bold">
                tmp
              </Typography>
            </ListItemText>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};

const Sections = () => {
  return (
    <>
      <List>
        <ListItem>
          <Skeleton className="w-full" height={32}></Skeleton>
        </ListItem>
        <ListItem>
          <Skeleton className="w-full" height={32}></Skeleton>
        </ListItem>
        <ListItem>
          <Skeleton className="w-full" height={32}></Skeleton>
        </ListItem>
      </List>
    </>
  );
};

const NavLinks = () => {
  return (
    <Box>
      <Toolbar />
      <Sections />
    </Box>
  );
};

export default NavLinks;
