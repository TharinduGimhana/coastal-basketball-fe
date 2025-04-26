import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  stripe_customer_id: "",
  stripe_subscription_id: "",
  stripe_subscription_item_id: "",
  subscription_price_id: "",
  subscription_plan_id: "",
  is_wait: "",
  status: "",
  start_date: "",
  end_date: "",
  created_at: ""
}

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    updateSubscription: (state, action) => {
      if (action.payload) {
        Object.assign(state, action.payload);
      } else {
        clearSubscription();
      }
    },
    clearSubscription: () => {
      return initialState;
    }
  },
});

export const { updateSubscription, clearSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;