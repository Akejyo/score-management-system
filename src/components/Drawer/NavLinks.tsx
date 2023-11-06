import {
  Box,
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
} from "@mui/icons-material";
const navLinks = [
  { path: "/add", text: "添加学生成绩", icon: <AddCircleOutline /> },
  { path: "/modify", text: "修改学生成绩", icon: <Edit /> },
  { path: "/check", text: "受理查分", icon: <ManageSearch /> },
];

const Sections = () => {
  return (
    <>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.path}>
            <Link to={link.path} underline="none" color="inherit">
              <ListItemButton>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText>
                  <Typography color="inherit" className="font-bold">
                    {link.text}
                  </Typography>
                </ListItemText>
              </ListItemButton>
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
