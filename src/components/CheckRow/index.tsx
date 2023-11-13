import { handleCheckScore } from "@/apis/common";
import { CheckBox, Maximize } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Checkbox,
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
import LoopIconBorder from "@mui/icons-material/Loop";
import LoopIcon from "@mui/icons-material/Loop";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { green, pink } from "@mui/material/colors";
type CheckRowProps = {
  student_name: string;
  student_number: string;
  req_time: string;
  exam_name: string;
  exam_id: number;
  state: number;
  onButtonClick: () => void;
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
  state,
  onButtonClick,
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
      case "finish":
        handleFinsih.mutate();
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
  const handleFinsih = useMutation(() =>
    handleCheckScore({
      student_number: student_number,
      exam_id: exam_id,
      op: 2,
    })
  );
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
          {state === 0 ? (
            <Checkbox
              disabled
              icon={<SyncProblemIcon />}
              sx={{
                "&.Mui-disabled": {
                  color: pink[500],
                },
              }}
            />
          ) : (
            <Checkbox
              disabled
              icon={<PublishedWithChangesIcon />}
              sx={{
                "&.Mui-disabled": {
                  color: green["A700"],
                },
              }}
            />
          )}

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
                  {state === 0 ? (
                    <Typography>
                      对于{student_name}的{exam_name}成绩，同意查分或驳回查分。
                    </Typography>
                  ) : (
                    <Typography sx={{ mr: 30 }}>
                      结束{student_name}的查分
                    </Typography>
                  )}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleClose("finish");
                    onButtonClick();
                  }}
                  disabled={state === 0}
                >
                  查分结束
                </Button>
                <Button
                  onClick={() => {
                    handleClose("agree");
                    onButtonClick();
                  }}
                  disabled={state === 1}
                  autoFocus
                >
                  同意查分
                </Button>
                <Button
                  onClick={() => {
                    handleClose("reject");
                    onButtonClick();
                  }}
                  disabled={state === 1}
                >
                  驳回查分
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};
export default CheckRow;
