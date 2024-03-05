import {
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED,
    CHANGE_SEARCHFIELD} from './constants'

export const setSearchfield = (text) =>({
    type:CHANGE_SEARCHFIELD,
    payload:text
})

export const requestRobots = () => (dispatch) =>{
    dispatch({type: REQUEST_ROBOTS_PENDING})
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response=>response.json())
        .then(data=>dispatch({type:REQUEST_ROBOTS_SUCCESS,payload:data}))
        .catch(err=>dispatch({type:REQUEST_ROBOTS_FAILED,payload:err}))
}