import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
        signupMessage : null,
        isEmailVerified : false
    },
    reducers : {
         login(state, action) {
            state.user = action.payload
         },
         logout(state) {
            state.user = null
         },
         signup(state, action) {
            state.signupMessage = action.payload
         },
         setUserPhoto(state, action){
            state.user.profilePhoto = action.payload
         },
         setUsername(state, action){
            state.user.username = action.payload
         },
         setIsEmailVerified( state){
            state.isEmailVerified = true;
            state.signupMessage = null
         }
    }
})
const authReducer = authSlice.reducer
const authActions = authSlice.actions
export {authActions, authReducer}
