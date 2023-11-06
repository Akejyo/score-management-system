import {
  LoginInfo,
  Exam,
  StudentInfo,
  Score,
  StudentScore,
} from "@/common/interfaces/response";
import request from "@/utils/requests";

const commonUrl = "/scoreManagementSystem";

export const register = (param: object) => {
  return request.get<boolean>(`${commonUrl}/login`, param);
};
