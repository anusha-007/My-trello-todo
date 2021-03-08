import { LOGOUT, USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "./actionTypes";

let initState = {
    isAuth: false,
    token: "",
    error: null,
    loading: null,
    currentUser:"",
    message:""
};

export const  loginReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case USER_LOGIN_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }

        case USER_LOGIN_SUCCESS: {
            return {
                ...state,
                isAuth: true,
                loading: false,
                error:false,
                token: payload.token,
                currentUser: payload.username,
                message:"login success"
               
            };
        }

        case USER_LOGIN_FAILURE: {
            return {
                ...state,
                loading: false,
                error: true,
                isAuth:false,
                message: "login failure"
            };
        }

        case LOGOUT:{
            return{
                ...state,
                isAuth:false
            }
        }
        default:
            return state;
    }
};