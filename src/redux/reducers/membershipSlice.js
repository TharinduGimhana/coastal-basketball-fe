import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  package: "",
  fee: "",
  product_id: "",
  price_id: "",
  billing_frequency: "",
  period: "",
  billing_desc: "",
  benefit: "",
  ideal: "",
  status: "",
  created_at: "",
  package_type_info: {
    id: "",
    title: "",
    limit: ""
  },
  billing_frequency_info: {
    id: "",
    title: "",
    term: ""
  },
  benefit_info: ""

}

const membershipSlice = createSlice({
  name: "base_membership",
  initialState,
  reducers: {
    updateBaseMembership: (state, action) => {
      if (action.payload) {
        Object.assign(state, action.payload);
      } else {
        clearBaseMembership();
      }
    },
    clearBaseMembership: () => {
      return initialState;
    }
  },
});

export const { updateBaseMembership, clearBaseMembership } = membershipSlice.actions;
export default membershipSlice.reducer;