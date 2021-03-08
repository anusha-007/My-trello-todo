import axios from "axios";
import { LOGOUT, USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "./actionTypes";


export let userLoginRequest = (payload) => {
    return {
        type: USER_LOGIN_REQUEST,
    };
};

export let userLoginSuccess = (payload) => {
    console.log(payload, "succe");
    return {
        type: USER_LOGIN_SUCCESS,
        payload: payload,
    };
};

export let userLoginFailure = (payload) => {
    console.log(payload, "failure");
    return {
        type: USER_LOGIN_FAILURE,
        payload: payload,
    };
};

export const fetchLoginData = (payload) => (dispatch) => {
    dispatch( userLoginRequest());
    console.log(payload, "datafetch");

    const  config = {
        method: "POST",
        url: "https://masai-api-mocker.herokuapp.com/auth/login",
        headers:{
            "Content-Type": "application/json" 
        },
        data: payload,
    };

    axios(config)
        .then((res) => dispatch( userLoginSuccess({token:res.data.token, username: payload.username,message:"login success"}) ))
        .catch( (err) =>  dispatch(userLoginFailure( {message:"login failed"} )) );
};



export const Logout = () => {
    return{
        type:LOGOUT
    }
}