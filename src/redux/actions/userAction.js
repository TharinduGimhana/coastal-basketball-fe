import { UPDATE_USER } from "redux/reduxConstants";

export const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: { ...user }
})