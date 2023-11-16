import * as React from "react";
import { Global } from "@emotion/react";
import { handleAddScore } from "@/apis/common";
import {
  styled,
  CssBaseline,
  Typography,
  SwipeableDrawer,
  TextField,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useAppState } from "@/states";
import { useState } from "react";
const drawerBleeding = 56;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function SwipeableEdgeDrawer(props: Props) {
  const { window } = props;
  const [open, setOpen] = useState(false);
  const [student_number, setStudent_number] = useState("");
  const [mathScore, setMathScore] = useState<number | "">("");
  const [languageScore, setLanguageScore] = useState<number | "">("");
  const [englishScore, setEnglishScore] = useState<number | "">("");
  const [physicsScore, setPhysicsScore] = useState<number | "">("");
  const [chemistryScore, setChemistryScore] = useState<number | "">("");
  const [biologyScore, setBiologyScore] = useState<number | "">("");

  const { state, dispatch } = useAppState();
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <Stack direction="row" spacing={2} sx={{ pt: 10, display: "flex" }}>
        <Box sx={{ p: 2 }}>
          <TextField label="学生姓名" variant="standard" />
        </Box>
        <Box sx={{ p: 2 }}>
          <TextField
            label="学生学号"
            variant="standard"
            value={student_number}
            onChange={(event) =>
              setStudent_number(
                event.target.value ? event.target.value.toString : ""
              )
            }
          />
        </Box>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: "visible",
            },
          }}
        />
        <Box sx={{ pl: 5, pt: 4 }}>
          <Button variant="contained" onClick={toggleDrawer(true)}>
            添加
          </Button>
        </Box>
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <Typography sx={{ p: 2, color: "text.secondary" }}>
              添加学生成绩
            </Typography>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            <Stack direction="row" spacing={2} sx={{ p: 1, display: "flex" }}>
              <Box sx={{ p: 2 }}>
                <TextField
                  label="数学成绩"
                  variant="standard"
                  value={mathScore}
                  onChange={(event) =>
                    setMathScore(
                      event.target.value ? parseFloat(event.target.value) : ""
                    )
                  }
                />
              </Box>
              <Box sx={{ p: 2 }}>
                <TextField
                  label="语文成绩"
                  variant="standard"
                  value={languageScore}
                  onChange={(event) =>
                    setLanguageScore(
                      event.target.value ? parseFloat(event.target.value) : ""
                    )
                  }
                />
              </Box>
              <Box sx={{ p: 2 }}>
                <TextField
                  label="英语成绩"
                  variant="standard"
                  value={englishScore}
                  onChange={(event) =>
                    setEnglishScore(
                      event.target.value ? parseFloat(event.target.value) : ""
                    )
                  }
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ p: 1, display: "flex" }}>
              <Box sx={{ p: 2 }}>
                <TextField
                  label="物理成绩"
                  variant="standard"
                  value={physicsScore}
                  onChange={(event) =>
                    setPhysicsScore(
                      event.target.value ? parseFloat(event.target.value) : ""
                    )
                  }
                />
              </Box>
              <Box sx={{ p: 2 }}>
                <TextField
                  label="化学成绩"
                  variant="standard"
                  value={chemistryScore}
                  onChange={(event) =>
                    setChemistryScore(
                      event.target.value ? parseFloat(event.target.value) : ""
                    )
                  }
                />
              </Box>
              <Box sx={{ p: 2 }}>
                <TextField
                  label="生物成绩"
                  variant="standard"
                  value={biologyScore}
                  onChange={(event) =>
                    setBiologyScore(
                      event.target.value ? parseFloat(event.target.value) : ""
                    )
                  }
                />
              </Box>
              <Box sx={{ pl: 5, pt: 4 }}>
                <Button
                  variant="contained"
                  onClick={() =>
                    handleAddScore({
                      exam_id: state.selectedExamId,
                      student_number: student_number,
                      language: languageScore,
                      math: mathScore,
                      english: englishScore,
                      physics: physicsScore,
                      chemistry: chemistryScore,
                      biology: biologyScore,
                    })
                  }
                >
                  确认
                </Button>
              </Box>
            </Stack>
          </StyledBox>
        </SwipeableDrawer>
      </Stack>
    </Root>
  );
}
