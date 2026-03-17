import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from "../../serverCall";

type MeasurementState = {
    flatList: any[]
    loading: boolean
    error: string | null
}

const initialState: MeasurementState = {
    flatList: [],
    loading: false,
    error: null,
}

export const fetchFlatMeasurement = createAsyncThunk(
    "measurements",
    async (_, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/measurements");
            return response?.data?.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const measurementSlice = createSlice({
    name: "measurements",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchFlatMeasurement.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFlatMeasurement.fulfilled, (state, action) => {
                state.loading = false;
                state.flatList = action.payload;
            })
            .addCase(fetchFlatMeasurement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
    },
});

export default measurementSlice.reducer;