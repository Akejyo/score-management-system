export type StudentInfo = {
  student_id: number;
  student_name: string;
};

export type StudentScore = {
  student_name: string;
  student_number: string;
  language: number;
  math: number;
  english: number;
  physics: number;
  chemistry: number;
  biology: number;
  all: number;
};

export type allScore = {
  scores: StudentScore[];
};

export type LoginInfo = {
  username: string;
  password: string;
};

export type RegisterInfo = {
  username: string;
  user_id: number;
  password: string;
};

export type accountInfo = {
  username: string;
  student_name: string;
  student_number: number;
  password: string;
  admin: number;
};

export type examInfo = {
  exam_name: string;
  exam_id: number;
  exam_time: string;
};

export type Exam = {
  examInfo: examInfo;
  students: StudentScore[];
};

export type CheckScoreInfo = {
  student_name: string;
  student_number: string;
  req_time: string;
  exam_name: string;
  exam_id: number;
};
