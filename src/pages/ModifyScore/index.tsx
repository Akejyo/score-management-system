import { getAllScore } from "@/apis/common";
import { StudentScore } from "@/common/interfaces/response";
import ChangeScore from "@/components/ChangeScore";
import { useAppState } from "@/states";
import { Container, List } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
const { state, dispatch } = useAppState();
const ModifyScore = () => {
  const [changeScores, setChangeScores] = useState<StudentScore[]>([]);
  const { data } = useQuery(
    "getchangeScores",
    () => getAllScore({ exam_id: state.selectedExamId }),
    {
      onSuccess: (data: any) => {
        console.log(data);
        setChangeScores(data.changeScores);
      },
    }
  );
  return (
    <Container sx={{ pt: 6 }}>
      <h1>修改成绩</h1>
      <List>
        {changeScores.map((changeScore) => {
          return (
            <ChangeScore
              student_name={changeScore.student_name}
              student_number={changeScore.student_number}
              language={changeScore.language}
              math={changeScore.math}
              english={changeScore.english}
              physics={changeScore.physics}
              chemistry={changeScore.chemistry}
              biology={changeScore.biology}
            ></ChangeScore>
          );
        })}
      </List>
    </Container>
  );
};
export default ModifyScore;
