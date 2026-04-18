import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from "../../serverCall";

type PageState = {
    flatList: any[]
    pageDetail: any | null
    loading: boolean
    error: string | null
}

const initialState: PageState = {
    flatList: [],
    pageDetail: null,
    loading: false,
    error: null,
}

export const fetchFlatPage = createAsyncThunk(
    "pages",
    async (_, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/pages");
            return response?.data?.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

export const fetchFlatPageBySlug = createAsyncThunk(
    "pages/fetchFlatPageBySlug",
    async (slug: string, { rejectWithValue }) => {
        try {
            const response = await serverCall.get(`/pages/slug/${slug}`);
            return response?.data?.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const pageSlice = createSlice({
    name: "pages",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchFlatPage.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFlatPage.fulfilled, (state, action) => {
                state.loading = false;
                state.flatList = action.payload;
            })
            .addCase(fetchFlatPage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })

            .addCase(fetchFlatPageBySlug.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFlatPageBySlug.fulfilled, (state, action) => {
                state.loading = false;
                state.pageDetail = action.payload;
            })
            .addCase(fetchFlatPageBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default pageSlice.reducer;