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
  Typography,
} from "@mui/material";
import { useState } from "react";

const CheckRow = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ p: 1 }}>
      <Paper elevation={2}>
        <Stack direction="row" spacing={2} sx={{ p: 1, display: "flex" }}>
          <Box sx={{ p: 1 }}>
            <Typography variant="caption" display="block" gutterBottom>
              申请人：
            </Typography>
            <Typography variant="body1" gutterBottom>
              张三
            </Typography>
          </Box>
          <Box sx={{ p: 1 }}>
            <Typography variant="caption" display="block" gutterBottom>
              学号：
            </Typography>
            <Typography variant="body1" gutterBottom>
              2021000000000
            </Typography>
          </Box>
          <Box sx={{ p: 1 }}>
            <Typography variant="caption" display="block" gutterBottom>
              申请时间：
            </Typography>
            <Typography variant="body1" gutterBottom>
              2023/11/8
            </Typography>
          </Box>
          <Box sx={{ p: 1 }}>
            <Typography variant="caption" display="block" gutterBottom>
              考试名：
            </Typography>
            <Typography variant="body1" gutterBottom>
              第一次期中考试
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
              <Alert severity="warning">该操作不可撤回！</Alert>
              <DialogTitle id="alert-dialog-title">
                {"请选择操作："}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  对于张三的第一次期中考试成绩，同意查分或驳回查分。
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  同意查分
                </Button>
                <Button onClick={handleClose}>驳回查分</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};
export default CheckRow;
