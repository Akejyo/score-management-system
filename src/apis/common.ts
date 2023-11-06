import {
  LoginInfo,
  Exam,
  StudentInfo,
  Score,
  StudentScore,
} from "@/common/interfaces/response";
import request from "@/utils/requests";

const commonUrl = "http://127.0.0.1:4523/m1/3539113-0-default";

//发送注册信息
export const sendRegisterInfo = (param: object) => {
  return request.get<object>(`${commonUrl}/register`, param);
};
