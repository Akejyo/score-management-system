import { sendRegisterInfo } from "@/apis/common";
import {
  Box,
  Button,
  Card,
  CardActions,
  Container,
  List,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

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
    } else if (code == 1) {
      //错误1
    } else {
      //错误2
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

  return (
    <Container sx={{ pt: 6 }}>
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
