import {
    DELETE_TODO_FAILURE,
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    EDIT_TODO_FAILURE,
    EDIT_TODO_REQUEST,
    EDIT_TODO_SUCCESS,
    FILTER_DATA,
    GET_TODO_FAILURE,
    GET_TODO_REQUEST,
    GET_TODO_SUCCESS,
    POST_TODO_FAILURE,
    POST_TODO_REQUEST,
    POST_TODO_SUCCESS,
} from "./actionTypes";

const initState = {
    todo: [],
    all:"",
    personal:"",
    official:"",
    inprogress:"",
    loading: null,
    error: null,
    message:""
};

export const todoReducer = (state = initState, action) => {
   
    switch (action.type) {
        case POST_TODO_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }

        case POST_TODO_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                message:"task created successfully"
            };
        }

        case POST_TODO_FAILURE: {
            return {
                ...state,
                loading: false,
                error: true,
                message: "error in creating task"
            };
        }

        case GET_TODO_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }

        case GET_TODO_SUCCESS: {
            
            return {
                ...state,
                loading: false,
                error: false,
                todo: action.payload
                
            };
        }

        case GET_TODO_FAILURE: {
            return {
                ...state,
                loading: false,
                error: true,
            };
        }

        case DELETE_TODO_REQUEST:{
            return{
                ...state,
                loading:true
            }
        }

        case DELETE_TODO_SUCCESS:{
            return{
                ...state,
                loading: false,
                error: false,
                message: "deleted data successfully",
                
            }
        }

        case DELETE_TODO_FAILURE: {
            return {
                ...state,
                loading: false,
                error: true,
                message: "failure in deleting data"
            };
        }

        case EDIT_TODO_REQUEST:{
            return{
                ...state,
                loading:true
            }
        }
        case EDIT_TODO_SUCCESS:{
            return{
                ...state,
                loading:false,
                error: false,
                message: "edited data successfully"
            }
        }

        case EDIT_TODO_FAILURE:{
            return{
                ...state,
                loading:false,
                error: false,
                message: "failure in editing data"
            }
        }

        case FILTER_DATA:{
            const personalTodos = state.todo.filter( (item) => item.personal === true )
            const officialTodos = state.todo.filter( (item) => item.official === true )
            const othersTodos = state.todo.filter( (item) => item.others === true )



            return{
                ...state,
                personal: personalTodos.length,
                official: officialTodos.length,
                others: othersTodos.length,
                all: state.todo.length

            }
           

        }
        
        default: {
            return state;
        }
    }
};
