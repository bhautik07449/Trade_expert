import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from "../../serverCall";

type CurrencyState = {
    flatList: any[]
    loading: boolean
    error: string | null
}

const initialState: CurrencyState = {
    flatList: [],
    loading: false,
    error: null,
}

export const fetchFlatCurrency = createAsyncThunk(
    "currency",
    async (_, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/currency");
            return response?.data?.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const currencySlice = createSlice({
    name: "Currency",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchFlatCurrency.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFlatCurrency.fulfilled, (state, action) => {
                state.loading = false;
                state.flatList = action.payload;
            })
            .addCase(fetchFlatCurrency.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
    },
});

export default currencySlice.reducer;