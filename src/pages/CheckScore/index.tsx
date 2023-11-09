import { Container, List } from "@mui/material";
import CheckRow from "@/components/CheckRow";
import { useQuery } from "react-query";
import { getCheckScore } from "@/apis/common";
import { CheckScoreInfo } from "@/common/interfaces/response";
import { useState } from "react";

const CheckScore = () => {
  const [checkRows, setCheckRows] = useState<CheckScoreInfo[]>([]);
  const { data } = useQuery("getCheckScore", () => getCheckScore(), {
    onSuccess: (data: any) => {
      // console.log(data);
      setCheckRows(data.checkRows);
    },
  });
  return (
    <Container sx={{ pt: 6 }}>
      <h1>受理查分</h1>
      <List>
        {checkRows.map((checkRow) => {
          return (
            <CheckRow
              student_name={checkRow.student_name}
              student_number={checkRow.student_number}
              req_time={checkRow.req_time}
              exam_name={checkRow.exam_name}
              exam_id={checkRow.exam_id}
            ></CheckRow>
          );
        })}
      </List>
    </Container>
  );
};
export default CheckScore;
