import VerticalLinearStepper from "@/components/Stepper";
import { Alert, Box, Container } from "@mui/material";

const Home = () => {
  return (
    <Container sx={{ pt: 6 }}>
      <h1>首页</h1>
      <Alert severity="info">按下面步骤开始操作</Alert>
      <VerticalLinearStepper />
    </Container>
  );
};
export default Home;
