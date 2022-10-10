import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
export const slice = createSlice({
    name: 'users',
    initialState: {
        users:[],
        usersTotal: 0
    },
    reducers: {
            get:(state,action)=>{
                    state.users  = action.payload.object.users
                    state.usersTotal =action.payload.object.total
            }
    },
})

export const getusers = (data) => apiCall({
    url: `/user`,
    method:'get',
    onSuccess:slice.actions.get.type

})


export default slice.reducer
