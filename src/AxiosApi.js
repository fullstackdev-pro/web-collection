import axios from "axios";

export const BaseURl = "http://localhost:5000/api"

export const api = ({dispatch}) => (next) => (action) => {
    if (action.type !== 'api/apiCall') {
        next(action)
        return
    }
    next(action)
    const {url, method, data, onSuccess, params, onFail} = action.payload
    axios({
        baseURL: BaseURl,
        url, method, data, params
    }).then(res => {
        dispatch({
            type: onSuccess,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: onFail,
            payload: err.response?.data
        })
    })
}

export default api
