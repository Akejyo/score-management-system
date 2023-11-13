import { Container, List } from "@mui/material";
import { useQuery } from "react-query";
import { useState } from "react";
import PutScore from "@/components/PutScore";

const AddScore = () => {
  return (
    <Container sx={{ pt: 6 }}>
      <h1>添加成绩</h1>
      <PutScore />
    </Container>
  );
};
export default AddScore;
