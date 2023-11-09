import { handleCheckScore } from "@/apis/common";
import { Maximize } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";

type CheckRowProps = {
  student_name: string;
  student_number: string;
  req_time: string;
  exam_name: string;
  exam_id: number;
};
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});
const CheckRow = ({
  student_name,
  student_number,
  req_time,
  exam_name,
  exam_id,
}: CheckRowProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (action: string) => {
    setOpen(false);
    switch (action) {
      case "agree":
        handleAgree.mutate();
        break;
      case "reject":
        handleReject.mutate();
        break;
      default:
        break;
    }
  };
  const handleAgree = useMutation(() =>
    handleCheckScore({
      student_number: student_number,
      exam_id: exam_id,
      op: 1,
    })
  );
  const handleReject = useMutation(() =>
    handleCheckScore({
      student_number: student_number,
      exam_id: exam_id,
      op: 0,
    })
  );

  return (
    <Box sx={{ p: 1 }}>
      <Paper elevation={2}>
        <Stack direction="row" spacing={2} sx={{ p: 1, display: "flex" }}>
          <Box sx={{ p: 1 }}>
            <Typography variant="caption" display="block" gutterBottom>
              申请人：
            </Typography>
            <Typography variant="body1" gutterBottom>
              {student_name}
            </Typography>
          </Box>
          <Box sx={{ p: 1 }}>
            <Typography variant="caption" display="block" gutterBottom>
              学号：
            </Typography>
            <Typography variant="body1" gutterBottom>
              {student_number}
            </Typography>
          </Box>
          <Box sx={{ p: 1 }}>
            <Typography variant="caption" display="block" gutterBottom>
              申请时间：
            </Typography>
            <Typography variant="body1" gutterBottom>
              {req_time}
            </Typography>
          </Box>
          <Box sx={{ p: 1 }}>
            <Typography variant="caption" display="block" gutterBottom>
              考试名：
            </Typography>
            <Typography variant="body1" gutterBottom>
              {exam_name}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ p: 1, pt: 2 }}>
            <Button variant="outlined" onClick={handleClickOpen}>
              选择操作
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <ThemeProvider theme={lightTheme}>
                <Alert variant="filled" severity="warning">
                  该操作不可撤回！
                </Alert>
              </ThemeProvider>
              <DialogTitle id="alert-dialog-title">
                {"请选择操作："}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  对于{student_name}的{exam_name}成绩，同意查分或驳回查分。
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose("agree")} autoFocus>
                  同意查分
                </Button>
                <Button onClick={() => handleClose("reject")}>驳回查分</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};
export default CheckRow;
