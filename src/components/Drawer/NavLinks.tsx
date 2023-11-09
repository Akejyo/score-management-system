import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "@/components/Link";
import {
  StarBorder,
  AddCircleOutline,
  Edit,
  ManageSearch,
  FormatListBulleted,
} from "@mui/icons-material";
import { useState } from "react";
const navLinks = [
  { path: "/", text: "首页", icon: <StarBorder /> },
  { path: "/add", text: "添加学生成绩", icon: <AddCircleOutline /> },
  { path: "/modify", text: "修改学生成绩", icon: <Edit /> },
  { path: "/view", text: "查看学生成绩", icon: <FormatListBulleted /> },
  { path: "/check", text: "受理查分  ", icon: <ManageSearch /> },
];

const Sections = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <List>
        {navLinks.map((link, index) => (
          <Link to={link.path} underline="none" color="inherit">
            <ListItem key={link.path} sx={{ mt: -0.5 }}>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemIcon sx={{ mr: 2 }}>
                  {link.icon}
                  <ListItemText
                    primary={link.text}
                    sx={{ pl: 2, mt: -0.01 }}
                  ></ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
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
