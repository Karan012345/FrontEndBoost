import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})


export const { login, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.userData;
export default authSlice.reducer;


/*  from lec no 22 */
/*“What does createSlice do?”
Correct answer:
It generates a reducer and corresponding action creators automatically, reducing boilerplate and 
allowing us to write state mutation logic in a simpler way using Immer.  */