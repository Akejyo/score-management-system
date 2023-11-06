export type StudentInfo = {
  student_id: number;
  student_name: string;
};

export type Score = {
  subject_id: number;
  score: number;
};

export type StudentScore = {
  student_id: number;
  scores: Score[];
};

export type Exam = {
  exam_id: number;
  exam_name: string;
  students: StudentScore[];
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
