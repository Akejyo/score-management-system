import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import Link from "../Link";
import { useQuery } from "react-query";
import { getAllExam } from "@/apis/common";
import { useState } from "react";
import { examInfo } from "@/common/interfaces/response";
import { useAppState } from "@/states";
import ListAltIcon from "@mui/icons-material/ListAlt";
const Aside = () => {
  const [latestExams, setLatestExams] = useState<examInfo[]>([]);
  const { state, dispatch } = useAppState();

  const { data, refetch } = useQuery(["getAllExam"], () => getAllExam(), {
    onSuccess: (data: any) => {
      setLatestExams(data.all_exam);
    },
  });
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    dispatch({
      type: "set exam",
      payload: latestExams[index].exam_name,
    });
    dispatch({
      type: "set exam id",
      payload: latestExams[index].exam_id,
    });
  };

  return (
    <Card sx={{ minWidth: 150, alignSelf: "flex-start", mr: 1.5, mt: 10 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <ListAltIcon sx={{ mb: -1, mr: 1 }} />
          近期考试
        </Typography>

        <Divider />
        <List>
          {latestExams.slice(0, 5).map((exam, index) => (
            <Link to="/view" underline="none" color="inherit">
              <ListItemButton
                onClick={(event) => handleListItemClick(event, index)}
                sx={{ mx: -2 }}
              >
                <Box sx={{ my: -1 }}>
                  <Typography sx={{ fontSize: 17, mt: 1 }} component="div">
                    {exam.exam_name}
                  </Typography>
                  <Typography sx={{}} color="text.secondary">
                    {exam.exam_time}
                  </Typography>
                </Box>

                <Divider />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
export default Aside;
