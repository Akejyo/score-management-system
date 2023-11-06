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
const navLinks = [
  { path: "/", text: "首页", icon: <StarBorder /> },
  { path: "/add", text: "添加学生成绩", icon: <AddCircleOutline /> },
  { path: "/modify", text: "修改学生成绩", icon: <Edit /> },
  { path: "/view", text: "查看学生成绩", icon: <FormatListBulleted /> },
  { path: "/check", text: "受理查分  ", icon: <ManageSearch /> },
];

const Sections = () => {
  return (
    <>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.path} sx={{ mt: -0.5, mb: -0.5 }}>
            <Link to={link.path} underline="none" color="inherit">
              <ListItemButton sx={{ ml: -1, mr: 4, width: 169 }}>
                <ListItemIcon sx={{ mr: -2 }}>{link.icon}</ListItemIcon>
                <ListItemText>
                  <Typography color="inherit" className="font-bold">
                    {link.text}
                  </Typography>
                </ListItemText>
              </ListItemButton>
              <Divider />
            </Link>
          </ListItem>
        ))}
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
