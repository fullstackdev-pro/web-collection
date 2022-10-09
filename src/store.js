import {configureStore} from "@reduxjs/toolkit";
import api from "./AxiosApi";
import UserReducer from "./reducers/UserReducer";
export default configureStore({
    reducer: {
        UserReducer
    },
    middleware: [api]
})
