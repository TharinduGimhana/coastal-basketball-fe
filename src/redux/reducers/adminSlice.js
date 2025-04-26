import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: "",
  name: "",
  email: "",
  updated_at: "",
  created_at: ""
}
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminInfo: (state, action) => {
      Object.assign(state, action.payload);
    },
    clearAdminInfo: (state) => {
      return initialState;
    },
  },
});

export const { setAdminInfo, clearAdminInfo } = adminSlice.actions;
export default adminSlice.reducer;