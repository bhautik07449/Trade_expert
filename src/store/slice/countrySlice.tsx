import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountryState {
    selectedCountry: string | null;
}

const initialState: CountryState = {
    selectedCountry: null,
};

const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        setSelectedCountry: (state, action: PayloadAction<string>) => {
            state.selectedCountry = action.payload;
        },
        clearSelectedCountry: (state) => {
            state.selectedCountry = null;
        },
    },
});

export const { setSelectedCountry, clearSelectedCountry } = countrySlice.actions;

export default countrySlice.reducer;