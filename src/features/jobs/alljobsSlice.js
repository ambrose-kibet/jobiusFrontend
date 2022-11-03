import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils";
import { logout } from "../user/userSlice";

const initialFilterState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFilterState,
};
export const getAllJobs = createAsyncThunk(
  "allJobs/getAlljos",
  async (_, thunkAPI) => {
    let url = "/jobs";
    try {
      const { data } = await customFetch.get(url, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logout());
        return thunkAPI.rejectWithValue("Unauthorzed! logging out..");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const showStats = createAsyncThunk(
  "allJobs/showStats",
  async (_, thunkAPI) => {
    try {
      const { data } = await customFetch.get("/jobs/showStats", {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logout());
        return thunkAPI.rejectWithValue("Unauthorzed! logging out..");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    hideLoading: (state) => {
      state.isLoading = false;
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (
      state,
      { payload: { jobs, totalJobs, numOfPages } }
    ) => {
      state.isLoading = false;
      state.jobs = jobs;
      state.totalJobs = totalJobs;
      state.numOfPages = numOfPages;
    },
    [getAllJobs.pending]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [showStats.pending]: (state) => {
      state.isLoading = true;
    },
    [showStats.fulfilled]: (
      state,
      { payload: { defaultStats, monthlyApplications } }
    ) => {
      state.isLoading = false;
      state.stats = defaultStats;
      state.monthlyApplications = monthlyApplications;
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});
export const { hideLoading, showLoading } = allJobsSlice.actions;
export default allJobsSlice.reducer;
