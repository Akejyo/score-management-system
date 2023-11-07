import ScoreTable from "@/components/ScoreTable";
import { Box, Container } from "@mui/material";

const ViewScore = () => {
  return (
    <Container sx={{ pt: 6 }}>
      <h1>查看学生成绩</h1>
      <ScoreTable />
    </Container>
  );
};
export default ViewScore;
