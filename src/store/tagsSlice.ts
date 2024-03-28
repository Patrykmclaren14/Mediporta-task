import axios from "axios"
import Tag from "../types/Tag"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface TagsState {
  tags: Tag[]
  loading: boolean
  error: string | null
}

const initialState: TagsState = {
  tags: [],
  loading: false,
  error: null,
}

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    fetchTagsStart(state) {
      state.loading = true
      state.error = null
    },
    fetchTagsSuccess(state, action: PayloadAction<Tag[]>) {
      state.loading = false
      state.tags = action.payload
    },
    fetchTagsFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { fetchTagsStart, fetchTagsSuccess, fetchTagsFailure } =
  tagsSlice.actions

export const fetchTags = 
  (page: number, pageSize: number, order: string, sort: string) => async (dispatch: any) => {
    dispatch(fetchTagsStart())
    try {
      const response = await axios.get(
        `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${pageSize}&order=${order}&sort=${sort}&site=stackoverflow`,
      )
      dispatch(fetchTagsSuccess(response.data.items))
    } catch (error) {
      dispatch(fetchTagsFailure("Error fetching data"))
    }
  }

export const selectTags = (state: { tags: TagsState }) => state.tags.tags
export const selectTagsLoading = (state: { tags: TagsState }) =>
  state.tags.loading
export const selectTagsError = (state: { tags: TagsState }) => state.tags.error

export default tagsSlice.reducer