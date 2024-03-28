import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  Box,
  MenuItem,
  Paper,
  Select,
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
  fetchTags,
  selectTags,
  selectTagsError,
  selectTagsLoading,
} from "../store/tagsSlice"
import { useSearchParams } from "react-router-dom"
import SkeletonLoader from "../SkeletonLoader"
import Error from "../Error"
import TagTableRow from "../TagTableRow"

const TagList = () => {
  // The useSearchParams hook returns an object containing the current URL query parameters
  const [searchParams, setSearchParams] = useSearchParams()

  // The useTheme hook returns the current Material-UI theme
  const theme = useTheme()

  // useDispatch is a hook that returns a reference to the dispatch function from the Redux Store
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  // Retrieve parameters from the URL
  const page = parseInt(searchParams.get("page") || "1")
  const pageSize = parseInt(searchParams.get("rowsPerPage") || "10")
  const order = searchParams.get("order") ?? "desc"
  const sort = searchParams.get("sort") ?? "popular"

  // Retrieve data from the Redux Store state
  const tags = useSelector(selectTags)
  const loading = useSelector(selectTagsLoading)
  const error = useSelector(selectTagsError)

  // Dispatch API data retrieval
  useEffect(() => {
    dispatch(fetchTags( page, pageSize, order, sort));
  }, [dispatch, page, pageSize, order, sort]);

  // Handle parameter changes

  // Function to handle page change in pagination
  const handleChangePage = (event: any, newPage: number) => {
    const nextPage = newPage + 1
    searchParams.set("page", nextPage.toString())
    setSearchParams(searchParams)
  }

  // Function to handle rows per page change in pagination
  const handleChangeRowsPerPage = (event: any) => {
    const newRowsPerPage = parseInt(event.target.value, 10)
    searchParams.set("rowsPerPage", newRowsPerPage.toString())
    setSearchParams(searchParams)
  }

  // Function to handle change in sorting order
  const handleOrderChange = (event: any) => {
    const newOrder = event.target.value as string;
    searchParams.set('order', newOrder);
    setSearchParams(searchParams)
  }

  // Function to handle change in sorting criteria
  const handleSortChange = (event: any) => {
    const newSort = event.target.value as string;
    searchParams.set('sort', newSort);
    setSearchParams(searchParams)
  }

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', minHeight: '100vh'}}>
      <Paper
        sx={{
          width: { xs: "100%", lg: "80%", xl: "60%" },
          my: theme.spacing(10),
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
        <TableContainer sx={{ maxHeight: "none" }}>
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
              {loading ? (
                <SkeletonLoader
                  skeleton={{
                    numberOfSkeletons: pageSize,
                    colSpan: 2,
                    width: 1100,
                    height: 28,
                  }}
                />
              ) : error ? (
                <Error errorMessage={error} />
              ) : (
                (pageSize > 0
                  ? tags.slice(page * pageSize, page * pageSize + pageSize)
                  : tags
                ).map((tag) => (
                  <TagTableRow key={tag.name} tag={tag} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default TagList
