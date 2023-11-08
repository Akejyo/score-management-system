import { Box, Container, List } from "@mui/material";
import CheckRow from "@/components/CheckRow";
const CheckScore = () => {
  return (
    <Container sx={{ pt: 6 }}>
      <h1>受理查分</h1>
      <List>
        <CheckRow />
        <CheckRow />
        <CheckRow />
      </List>
    </Container>
  );
};
export default CheckScore;
