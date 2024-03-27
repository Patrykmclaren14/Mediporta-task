import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
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
  const [searchParams, setSearchParams] = useSearchParams()

  const theme = useTheme()
  const dispatch = useDispatch()

  const page = parseInt(searchParams.get("page") || "1")
  const pageSize = parseInt(searchParams.get("rowsPerPage") || "10")
  const order = searchParams.get("order") ?? "desc"

  const tags = useSelector(selectTags)
  const loading = useSelector(selectTagsLoading)
  const error = useSelector(selectTagsError)

  const fetchData = () => {
    dispatch(fetchTags(page, pageSize, order))
  }

  useEffect(() => {
    fetchData()
  }, [dispatch, page, pageSize, order])

  const handleChangePage = (event: any, newPage: number) => {
    const nextPage = newPage + 1
    searchParams.set("page", nextPage.toString())
    setSearchParams(searchParams)
  }

  const handleChangeRowsPerPage = (event: any) => {
    const newRowsPerPage = parseInt(event.target.value, 10)
    searchParams.set("rowsPerPage", newRowsPerPage.toString())
    setSearchParams(searchParams)
  }

  return (
    <main className="flex justify-center min-h-screen ">
      <Paper
        sx={{
          width: { xs: "100%", lg: "80%", xl: "60%" },
          my: theme.spacing(10),
        }}
      >
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={500}
          rowsPerPage={pageSize}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
    </main>
  )
}

export default TagList
