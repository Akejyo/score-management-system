import {
  Exam,
  LoginInfo,
  StudentInfo,
  StudentScore,
  allScore,
  examInfo,
} from "@/common/interfaces/response";
import request from "@/utils/requests";

const commonUrl = "http://127.0.0.1:4523/m1/3539113-0-default";
// const commonUrl = "/dev";

//发送注册信息
export const sendRegisterInfo = (param: object) => {
  return request.get<object>(`${commonUrl}/user/register`, param);
};

//获取所有考试信息
export const getAllExam = () => {
  return request.get<examInfo[]>(`${commonUrl}/exam/get`);
};

//获取考试的所有学生成绩
export const getAllScore = (param: object) => {
  return request.get<allScore>(`${commonUrl}/score/oneexam`, param);
};
