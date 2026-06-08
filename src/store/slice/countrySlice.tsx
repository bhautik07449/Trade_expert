import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountryState {
    selectedCountry: string | null;
}

const initialState: CountryState = {
    selectedCountry: localStorage.getItem("selectedCountry") || null,
};

const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        setSelectedCountry: (state, action: PayloadAction<string>) => {
            state.selectedCountry = action.payload;
            if (action.payload) {
                localStorage.setItem("selectedCountry", action.payload);
            } else {
                localStorage.removeItem("selectedCountry");
            }
        },
        clearSelectedCountry: (state) => {
            state.selectedCountry = null;
            localStorage.removeItem("selectedCountry");
        },
    },
});

export const { setSelectedCountry, clearSelectedCountry } = countrySlice.actions;

export default countrySlice.reducer;