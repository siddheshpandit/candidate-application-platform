import { createSlice } from '@reduxjs/toolkit';

const jobs = [];

const jobsSlice = createSlice({
    name: 'jobsSlice',
    initialState:jobs,
    reducers: {
        addJobs: (state, action) => {
            return [...state,...action.payload]
        }
    }
});

export const { addJobs } = jobsSlice.actions;
export default jobsSlice.reducer;