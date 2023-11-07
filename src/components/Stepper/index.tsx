import * as React from "react";
import {
  Box,
  Stepper,
  Step,
  Button,
  Paper,
  Typography,
  Select,
  StepLabel,
  StepContent,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppState } from "@/states";
import { getAllExam } from "@/apis/common";
import { useQuery } from "react-query";

const steps = [
  {
    label: "选择需要操作的考试",
    description: `在下面的下拉列表中选择需要操作的考试`,
  },
  {
    label: "在左侧栏里选择需要操作的类型",
    description:
      "可以在顶部栏左侧选择打开或收起侧边栏，你可以进行的操作有：1. 添加学生成绩； 2. 修改学生成绩； 3. 查看学生成绩；4. 受理查分；",
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [allExamInfo, setAllExamInfo] = useState([]);
  const { state, dispatch } = useAppState();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  //记录选择到appstate里
  const handleChange = (event: SelectChangeEvent) => {
    dispatch({
      type: "set exam",
      payload: event.target.value,
    });
    setSelectedValue(event.target.value);
  };

  const { data, refetch } = useQuery(["getAllExam"], () => getAllExam(), {
    onSuccess: (data: any) => {
      setAllExamInfo(data.all_exam);
    },
  });

  const [selectedValue, setSelectedValue] = useState("a");
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {index === 0 && (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">考试</InputLabel>
                  <Select
                    value={state.selectedExam}
                    label="examId"
                    onChange={handleChange}
                  >
                    {allExamInfo.map((exam: any) => (
                      <MenuItem key={exam.exam_id} value={exam.exam_id}>
                        {exam.exam_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "结束" : "下一步"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    上一步
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography></Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
