import { USER_REGISTER_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "./actionTypes"

const initState = {
    isLoading:null,
    error:null,
    message:"",
    isRegistered:false
}

export const registerReducer = (state = initState, {type,payload}) =>{
    switch(type){
        case USER_REGISTER_REQUEST:{
            return{
                ...state,
                isLoading:true,
                error:false,
                message:"loading pls wait"
            }
        }

        case USER_REGISTER_SUCCESS:{
            return{
                ...state,
                isLoading:false,
                error:false,
                isRegistered:true,
                message: "register success, pls login"
                
            }
        }

        case USER_REGISTER_FAILURE:{
            return{
                ...state,
                isLoading:false,
                isRegistered:false,
                error: true,
                message:"registeration failed"

            }
        }

        default:
            return state


    }
}