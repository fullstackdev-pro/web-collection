import {configureStore} from "@reduxjs/toolkit";
import api from "./AxiosApi";
import UserReducer from "./reducers/UserReducer";
import ItemReducer from "./reducers/ItemReducer";
export default configureStore({
    reducer: {
        UserReducer,
        ItemReducer,
    },
    middleware: [api]
})
