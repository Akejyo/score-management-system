import { sendRegisterInfo } from "@/apis/common";
import {
  Box,
  Button,
  Card,
  CardActions,
  Container,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const fields = [
  { id: "username", label: "用户名" },
  { id: "student_name", label: "姓名" },
  { id: "student_number", label: "学号" },
  { id: "password", label: "密码" },
  { id: "confirmPassword", label: "确认密码" },
];

const RegisterForm = () => {
  const [accountInfo, setAccountInfo] = useState({
    username: "",
    student_name: "",
    student_number: "",
    password: "",
    admin: 0,
  });
  const [code, setCode] = useState(-1);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError1, setOpenError1] = useState(false);
  const [openError2, setOpenError2] = useState(false);

  const { data: datacode, refetch } = useQuery(
    ["sendRegisterInfo", accountInfo],
    () => sendRegisterInfo(accountInfo),
    {
      onSuccess: (data: any) => {
        setCode(data.code);
      },
      enabled: false,
    }
  );
  useEffect(() => {
    if (code == 0) {
      //注册成功
      setOpenSuccess(true);
      setOpenError1(false);
      setOpenError2(false);
    } else if (code == 1) {
      //错误1，用户名已被注册
      setOpenSuccess(false);
      setOpenError1(true);
      setOpenError2(false);
    } else {
      //错误2，学号已被注册
      setOpenSuccess(false);
      setOpenError1(false);
      setOpenError2(true);
    }
  }, [code]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id !== "confirmPassword") {
      setAccountInfo({
        ...accountInfo,
        [event.target.id]: event.target.value,
      });
    }
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    refetch();
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError1(false);
    setOpenError2(false);
  };
  return (
    <Container sx={{ pt: 6 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          注册成功！
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openError1}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          该用户名已被使用！
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openError2}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          该学号已被注册！
        </Alert>
      </Snackbar>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: 400, px: 5 }}>
          <h1 style={{ textAlign: "center" }}>Register</h1>
          <Stack component="form" direction={"column"}>
            {fields.map((field) => (
              <TextField
                key={field.id}
                id={field.id}
                label={field.label}
                variant="standard"
                sx={{ mb: 2 }}
                onChange={handleChange}
              />
            ))}
          </Stack>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button variant="contained" onClick={handleSubmit}>
              提交
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};
export default RegisterForm;
