import * as React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

import { useState } from "react";

type ChangeScoreProps = {
  student_name: string;
  student_number: string;
  language: number;
  math: number;
  english: number;
  physics: number;
  chemistry: number;
  biology: number;
};

const ChangeScore = ({
  student_name,
  student_number,
  language,
  math,
  english,
  physics,
  chemistry,
  biology,
}: ChangeScoreProps) => {
  const [open, setOpen] = useState(false);
  const [subjectScore, setSubjetScore] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [subject, setSubject] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSubject(event.target.value);
    const selectedExamName = event.target.value as string;

    switch (selectedExamName) {
      case "language":
        setSubjetScore(language);
        break;
      case "math":
        setSubjetScore(math);
        break;
      case "english":
        setSubjetScore(english);
        break;
      case "physics":
        setSubjetScore(physics);
        break;
      case "chemistry":
        setSubjetScore(chemistry);
        break;
      case "biology":
        setSubjetScore(biology);
        break;
    }
  };
  return (
    <Box sx={{ p: 1 }}>
      <Paper elevation={2}>
        <Stack direction="row" spacing={2} sx={{ p: 1, display: "flex" }}>
          <Box sx={{ p: 1, width: 150 }}>
            <Typography variant="caption" display="block" gutterBottom>
              姓名：
            </Typography>
            <Typography variant="body1" gutterBottom>
              {student_name}
            </Typography>
          </Box>
          <Box sx={{ p: 1, width: 150 }}>
            <Typography variant="caption" display="block" gutterBottom>
              学号：
            </Typography>
            <Typography variant="body1" gutterBottom>
              {student_number}
            </Typography>
          </Box>
          <Box sx={{ p: 1, width: 200 }}>
            <FormControl variant="standard" sx={{ m: 1, width: 150 }}>
              <InputLabel id="demo-simple-select-standard-label">
                学科
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-standard"
                value={subject}
                label="Subject"
                onChange={handleChange}
              >
                <MenuItem value="language">语文</MenuItem>
                <MenuItem value="math">数学</MenuItem>
                <MenuItem value="english">英语</MenuItem>
                <MenuItem value="physics">物理</MenuItem>
                <MenuItem value="chemistry">化学</MenuItem>
                <MenuItem value="biology">生物</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ p: 1, width: 150 }}>
            <Typography variant="caption" display="block" gutterBottom>
              当前成绩：
            </Typography>
            <Typography variant="body1" gutterBottom>
              {subjectScore}
            </Typography>
          </Box>
          <Box sx={{ width: 150 }}>
            <Typography variant="caption" display="block" gutterBottom>
              修改成绩为：
            </Typography>
            <Typography variant="body1" gutterBottom>
              <TextField label="" variant="standard" />
            </Typography>
          </Box>
          <Box sx={{ pl: 3, width: 150 }}>
            <Box sx={{ pt: 3 }}>
              <Button variant="contained">确认</Button>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};
export default ChangeScore;
