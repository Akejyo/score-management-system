import VerticalLinearStepper from "@/components/Stepper";
import { Alert, Container } from "@mui/material";

const Home = () => {
  return (
    <Container sx={{ pt: 6 }}>
      <h1>学生成绩管理系统</h1>
      <Alert severity="info">请按下面步骤开始操作</Alert>
      <VerticalLinearStepper />
    </Container>
  );
};
export default Home;
