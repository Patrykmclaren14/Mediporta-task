import PropTypes from 'prop-types';
import { ChangeEvent, useState } from "react";
import {
  Box,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  useTheme,
} from "@mui/material";
import TagTableRow from "../TagTableRow";
import SkeletonLoader from '../SkeletonLoader';
import Error from "../Error";
import Tag from "../types/Tag";

const TagList = ({ state, orderType, sortType }: { state: string, orderType: string, sortType: string }) => {
  const theme = useTheme();

  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const tags = [
    {
      name: 'Java',
      count: 1,
    },
    {
      name: 'Python',
      count: 3,
    },
    {
      name: 'JavaScript',
      count: 5,
    },
  ];

  if (sortType === 'popular') {
    tags.sort((a, b) => b.count - a.count); 
  }
  
  if (sortType === 'name') {
    tags.sort((a, b) => a.name.localeCompare(b.name)); 
  }

  if (orderType === 'desc') {
    tags.reverse()
  }

  const isLoading = state === 'isLoading';
  const error = state === 'error';

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    const nextPage = newPage + 1;
    setPage(nextPage);
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setPageSize(newRowsPerPage);
  };

  const handleOrderChange = (event: SelectChangeEvent<string>) => {
    const newOrder = event.target.value;
    setOrder(newOrder);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const newSort = event.target.value;
    setSort(newSort);
  }

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', minHeight: '100vh'}}>
      <Paper
        sx={{
          width: { xs: "100%", lg: "80%", xl: "60%" },
          padding: '10px',
          my: theme.spacing(10),
          boxShadow: 'none',
        }}
      >
        <TableContainer sx={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}> 
          <TableSortLabel sx={{display: 'flex', gap: '20px'}}>
            <Select value={order} onChange={handleOrderChange} sx={{width: '100px'}}>
              <MenuItem value="desc">Desc</MenuItem>
              <MenuItem value="asc">Asc</MenuItem>
            </Select>
            <Select value={sort} onChange={handleSortChange} sx={{width: '150px'}}>
              <MenuItem value="popular">Popular</MenuItem>
              <MenuItem value="activity">Activity</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </Select>
          </TableSortLabel>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={500}
            rowsPerPage={pageSize}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer> 
        <TableContainer sx={{overflow: 'hidden'}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="table-cell">
                  Name
                </TableCell>
                <TableCell align="center">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {isLoading && (
                <SkeletonLoader
                  skeleton={{
                    numberOfSkeletons: pageSize,
                    colSpan: 2,
                    width: 1100,
                    height: 28,
                  }}
                />
              )}

              {error && !isLoading && (
                <Error errorMessage={'error'} />
              )}

              {!isLoading && !error && (
                tags.map((tag: Tag) => <TagTableRow key={tag.name} tag={tag} />)
              )}

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

TagList.propTypes = {
  state: PropTypes.oneOf(['error', 'isLoading', 'tags']),
  orderType: PropTypes.oneOf(['asc', 'desc']),
  sortType: PropTypes.oneOf(['popular', 'name']),
};

export default TagList;
