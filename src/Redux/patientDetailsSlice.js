import { createSlice } from "@reduxjs/toolkit";

const patientDetailsSlice = createSlice({
    name: "patientDetails",
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: {
        setPatientDetails: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setPatientDetails } = patientDetailsSlice.actions;
export default patientDetailsSlice.reducer;

