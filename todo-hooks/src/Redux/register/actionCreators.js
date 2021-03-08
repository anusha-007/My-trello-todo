
import axios from "axios"
import { USER_REGISTER_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "./actionTypes"
export const userRegisterRequest = () => {
    return{
        type:USER_REGISTER_REQUEST
    }
}

export const userRegisterSuccess = (payload) => {
    return{
        type: USER_REGISTER_SUCCESS,
        payload: payload
    }
}

export const userRegisterFailure = (payload) => {
    return{
        type: USER_REGISTER_FAILURE,
        payload:payload
    }
    
}

export const registerUser = (userDetails) => dispatch =>{
    dispatch( userRegisterRequest())
    const config = {
        method:"POST",
        url:"https://masai-api-mocker.herokuapp.com/auth/register",
        data: userDetails,
        headers:{ "Content-Type": "application/json"}
    }


    return axios(config)
     .then( (res) => {
         dispatch( userRegisterSuccess({message:"registered successfully"}) )
     })
     .catch( () => dispatch( userRegisterFailure({message:"register failed"} )))
}