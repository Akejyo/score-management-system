import { Box, Container, List } from "@mui/material";
import CheckRow from "@/components/CheckRow";
const CheckScore = () => {
  return (
    <Container sx={{ pt: 6 }}>
      <h1>受理查分</h1>
      <List>
        <CheckRow
          student_name="张三"
          student_number="2021000000000"
          req_time="2021/11/8"
          exam_name="第一次期末考试"
        />
        <CheckRow
          student_name="张三"
          student_number="2021000000000"
          req_time="2021/11/8"
          exam_name="第一次期末考试"
        />
        <CheckRow
          student_name="张三"
          student_number="2021000000000"
          req_time="2021/11/8"
          exam_name="第一次期末考试"
        />
      </List>
    </Container>
  );
};
export default CheckScore;
