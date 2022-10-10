import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";

export const slice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        usersTotal: 0,
        current: false,
        userToggle:false
    },
    reducers: {
        get: (state, action) => {
            state.users = action.payload.object.users
            state.usersTotal = action.payload.object.total
        },
        delete: (state, action) => {
            toast.success('User Deleted')
        },
        post: (state, action) => {

            if (action.payload.details){
                 toast.warning(action.payload.details[0].message)
                state.userToggle  = false
                state.current = !state.current

            }
           else  if (action.payload.message){
                 toast.warning(action.payload.message)
                state.userToggle  = false
                state.current = !state.current

            }
            else if(action.payload.savedUser){
                toast.success('User Saved')
                state.userToggle = true
                state.current = !state.current
            }

        },
        update: (state, action) => {

            console.log(action.payload)
            if(action.payload.keyPattern?.username){
                toast.warning('Username already is exist')
                state.userToggle  = false
                state.current = !state.current

            }
            else if(action.payload.keyPattern?.email){
                toast.warning('Email already is exist')
                state.userToggle  = false
                state.current = !state.current

            }
            else if(action.payload.updated){
                console.log('ejreg')
                toast.success('User Updated')
                state.userToggle = true
                state.current = !state.current
            }

        }


    },
})

export const getusers = (page) => apiCall({
    url: `/user?page=${page}&limit=5`,
    method: 'get',
    onSuccess: slice.actions.get.type

})
export const getUsersSearch = (search, page) => apiCall({
    url: `/user?page=${page}&limit=5&search=${search}`,
    method: 'get',
    onSuccess: slice.actions.get.type

})

export const userdelete = (id) => apiCall({
    url: '/user/' + id,
    method: 'delete',
    onSuccess: slice.actions.delete.type,
    onFail: slice.actions.delete.type
})

export const saveusers = (data) => apiCall({
    url: '/user',
    method: 'post',
    data,
    onSuccess: slice.actions.post.type,
    onFail: slice.actions.post.type
})

export const updateusers = (data) => apiCall({
    url: '/user/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.update.type,
    onFail: slice.actions.update.type
})

export default slice.reducer
