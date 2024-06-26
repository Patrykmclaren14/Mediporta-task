import { ChangeEvent, useEffect } from "react"
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
} from "@mui/material"
import {
  useGetTagsQuery,
} from "../store/tagsSlice"
import { useSearchParams } from "react-router-dom"
import SkeletonLoader from "../SkeletonLoader"
import Error from "../Error"
import TagTableRow from "../TagTableRow"
import Tag from "../types/Tag";

const TagList = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const theme = useTheme()

  const page = parseInt(searchParams.get("page") || "1")
  const pageSize = parseInt(searchParams.get("rowsPerPage") || "10")
  const order = searchParams.get("order") ?? "desc"
  const sort = searchParams.get("sort") ?? "popular"
  
  const { data: tags, error, isLoading, refetch } = useGetTagsQuery({
    page,
    pageSize,
    order,
    sort,
  });

  useEffect(() => {
    refetch()

  }, [page, pageSize, order, sort, refetch, tags?.items])

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    const nextPage = newPage + 1
    searchParams.set('page', nextPage.toString())
    setSearchParams(searchParams)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    searchParams.set('rowsPerPage', newRowsPerPage.toString());
    setSearchParams(searchParams);
  };

  const handleOrderChange = (event: SelectChangeEvent<string>) => {
    const newOrder = event.target.value;
    searchParams.set('order', newOrder);
    setSearchParams(searchParams);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const newSort = event.target.value
    searchParams.set('sort', newSort);
    setSearchParams(searchParams)
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
                <Error errorMessage={typeof error === 'string' ? error : 'Error fetching data'} />
              )}

             {!isLoading && !error && (
                tags?.items?.map((tag: Tag) => <TagTableRow key={tag.name} tag={tag} />
             ))}

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default TagList
