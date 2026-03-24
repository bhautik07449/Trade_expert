import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from '../../serverCall'

export const fetchCategories = createAsyncThunk(
    "categories/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/categories");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

export const fetchFlatCategories = createAsyncThunk(
    "categories/fetchFlat",
    async (_, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/categories/flat");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

type CategoriesState = {
    flatList: any[]
    categories: any[]
    loading: boolean
    error: string | null
}

const initialState: CategoriesState = {
    flatList: [],
    categories: [],
    loading: false,
    error: null,
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false
                state.categories = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            .addCase(fetchFlatCategories.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchFlatCategories.fulfilled, (state, action) => {
                state.loading = false
                state.flatList = action.payload
            })
            .addCase(fetchFlatCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default categoriesSlice.reducer