import VerticalLinearStepper from "@/components/Stepper";
import { Alert, Container, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const Home = () => {
  return (
    <Container sx={{ pt: 6 }}>
      <h1>学生成绩管理系统</h1>
      <ThemeProvider theme={lightTheme}>
        <Alert severity="info">请按下面步骤开始操作</Alert>
      </ThemeProvider>
      <Paper sx={{ mt: 1, p: 1 }}>
        <VerticalLinearStepper />
      </Paper>
    </Container>
  );
};
export default Home;
