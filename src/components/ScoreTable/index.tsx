import * as React from "react";
import {
  alpha,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { StudentScore } from "@/common/interfaces/response";
import { useState } from "react";
import { useAppState } from "@/states";
import { useQuery } from "react-query";
import { getAllScore } from "@/apis/common";

function createData(
  student_name: string,
  all: number,
  language: number,
  math: number,
  english: number,
  physics: number,
  chemistry: number,
  biology: number
): StudentScore {
  return {
    student_name,
    all,
    language,
    math,
    english,
    physics,
    chemistry,
    biology,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof StudentScore;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "student_name",
    numeric: false,
    disablePadding: true,
    label: "姓名",
  },
  {
    id: "all",
    numeric: true,
    disablePadding: false,
    label: "总分",
  },
  {
    id: "language",
    numeric: true,
    disablePadding: false,
    label: "语文",
  },
  {
    id: "math",
    numeric: true,
    disablePadding: false,
    label: "数学",
  },
  {
    id: "english",
    numeric: true,
    disablePadding: false,
    label: "英语",
  },
  {
    id: "physics",
    numeric: true,
    disablePadding: false,
    label: "物理",
  },
  {
    id: "chemistry",
    numeric: true,
    disablePadding: false,
    label: "化学",
  },
  {
    id: "biology",
    numeric: true,
    disablePadding: false,
    label: "生物",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof StudentScore
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof StudentScore) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  const { state, dispatch } = useAppState();
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {state.selectedExam}·成绩单
      </Typography>
    </Toolbar>
  );
}
export default function ScoreTable() {
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof StudentScore>("all");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { state, dispatch } = useAppState();
  const [rows, setRows] = useState([createData("", 0, 0, 0, 0, 0, 0, 0)]);

  const { data, refetch } = useQuery(
    //从state中获取exam_id，请求获得所有学生成绩
    ["getScore"],
    () => getAllScore({ exam_id: state.selectedExamId }),
    {
      onSuccess: (data: any) => {
        const newRows = data.allScore.map((srow: StudentScore) =>
          createData(
            srow.student_name,
            srow.all,
            srow.language,
            srow.math,
            srow.english,
            srow.physics,
            srow.chemistry,
            srow.biology
          )
        );
        setRows([...newRows]);
      },
    }
  );
  React.useEffect(() => {
    refetch();
  }, [state.selectedExamId]);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof StudentScore
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rows, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              onSelectAllClick={function (
                event: React.ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.student_name}
                    </TableCell>
                    <TableCell align="right">{row.all}</TableCell>
                    <TableCell align="right">{row.language}</TableCell>
                    <TableCell align="right">{row.math}</TableCell>
                    <TableCell align="right">{row.english}</TableCell>
                    <TableCell align="right">{row.physics}</TableCell>
                    <TableCell align="right">{row.chemistry}</TableCell>
                    <TableCell align="right">{row.biology}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="紧凑显示"
      />
    </Box>
  );
}
