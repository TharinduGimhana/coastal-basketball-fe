import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: "",
  first_name: "",
  last_name: "",
  birthday: "",
  address: "",
  email: "",
  access_time: "",
  created_at: "",
  updated_at: "",
  ip_address: "",
  verify_link: "",
  is_deleted: "",
  status: "",
  subscription_plan_id: "",
  signup_type: "",
  note: "",
  gender: "",
  phone_number: "",
  child_info: []
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      Object.assign(state, action.payload);
    },
    clearUserInfo: (state) => {
      return initialState;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;