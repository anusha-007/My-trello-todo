import {  GET_TODO_FAILURE, GET_TODO_REQUEST, 
    GET_TODO_SUCCESS, POST_TODO_FAILURE, POST_TODO_REQUEST, 
    POST_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    UPDATE_SUBTASKS_TODO_REQUEST,
    UPDATE_SUBTASKS_TODO_SUCCESS,
    UPDATE_SUBTASKS_TODO_FAILURE,
    EDIT_TODO_REQUEST,
    EDIT_TODO_SUCCESS,
    EDIT_TODO_FAILURE,
    FILTER_DATA} from "./actionTypes"
import axios from "axios"


export const postTodoRequest = () => {
    return{
        type:POST_TODO_REQUEST

    }
}

export const postTodoSuccess = (payload) => {
    console.log(payload, payload.message, "msggg")
    return{
        type:POST_TODO_SUCCESS,
        payload:payload.data
    }
}

export const postTodoFailure = (err) => {
    return{
        type:POST_TODO_FAILURE,
        payload : err
    }
}


export const postTodoData = (payload) => (dispatch) => {
    dispatch( postTodoRequest() )

    const config = {
        method:"POST",
        url:"https://mock-server-anusha.herokuapp.com/tasks",
        headers:{
            "Content-Type":"application/json"
        },
        data:payload

    }

   return axios(config)
     .then( (res) => {
        
         return dispatch( postTodoSuccess( res.data) )
     } )
     .catch( err => {
        //  console.log(err)
         return dispatch( postTodoFailure(err) )
     })


}


export const getTodoRequest = () => {
    return{
        type:GET_TODO_REQUEST
    }
}


export const getTodoSuccess = (payload) => {
    return{
        type:GET_TODO_SUCCESS,
        payload:payload
    }
}

export const getTodoFailure = (err) => {
    return{
        type:GET_TODO_FAILURE,
        payload:err
    }
}

export const getTodoData = ( ) => (dispatch) => {
    dispatch( getTodoRequest() )
    const config = {
        method:"GET",
        url:"https://mock-server-anusha.herokuapp.com/tasks",
        headers:{
            "Content-Type":"application/json"
        }
        
    }

    return axios(config)
     .then( (res) => {
        //  console.log(res.data)
         return dispatch( getTodoSuccess(res.data) )
     })
     .catch( err => {
        //  console.log(err)
         return dispatch( getTodoFailure( err ))
     })
}






export const deleteTodoRequest = () => {
    return{
        type: DELETE_TODO_REQUEST
    }
}

export const deleteTodoSuccess = (payload) => {
    return{
        type: DELETE_TODO_SUCCESS,
        payload:payload
    }
}

export const deleteTodoFailure = (payload) => {
    return{
        type: DELETE_TODO_FAILURE,
        payload:payload
    }
}

export const deleteTodoData = (id) => (dispatch) => {
    dispatch( deleteTodoRequest() )
    const config = {
        method: "delete",
        url:`https://mock-server-anusha.herokuapp.com/tasks/${id}`,
        headers:{
            "Content-Type":"application/json"
        }
    }

    return axios(config)
              .then( (res) => dispatch( deleteTodoSuccess({message:"deleted successfully"}) ) )
              .then( dispatch(getTodoData()) )
              .catch( (err) => dispatch( deleteTodoFailure( {message:"deleting item failed"} ) ))
}

export const updateSubtasksStatusRequest = () => {
    return{
        type: UPDATE_SUBTASKS_TODO_REQUEST
 
   }
}

export const updateSubtasksStatusSuccess = (payload) => {
    return{
        type: UPDATE_SUBTASKS_TODO_SUCCESS,
        payload:payload
    }
}

export const updateSubtasksStatusFailure = (payload) => {
    return{
        type: UPDATE_SUBTASKS_TODO_FAILURE,
        payload:payload
    }
}

export const updateSubtasks = (payload) => (dispatch) => {
    dispatch( updateSubtasksStatusRequest())

    const config = {
        method:"get",
        url:`https://mock-server-anusha.herokuapp.com/tasks/${payload.taskId}`
    }
    return axios( config )
            .then( (res) => {
                console.log(res.data, "first getting main task dataaa")
                const {subtasks} = res.data;
                const updatedSubTasks = subtasks.map( (item) => item.id.toString() === payload.subTaskId.toString() ? {...item, status:payload.status} : item )
                console.log(updatedSubTasks, "patch")
                const config = {
                    method:"patch",
                    url: `https://mock-server-anusha.herokuapp.com/tasks/${payload.taskId}`,
                    data:{
                        "subtasks": updatedSubTasks
                    }
                }

               return axios(config).then( (res) => {
                    console.log(res.data,"upd data")
                    return dispatch( updateSubtasksStatusSuccess(res.data) ).then( dispatch(getTodoData() ) )
                }  )
                .catch( err => {
                    console.log(err, "error")
                    return dispatch( updateSubtasksStatusFailure( err))
                })
            } )
            .catch( err => console.log( err, "last catch statement"))

           

}



export const editTodoRequest = () => {
    return{
        type:EDIT_TODO_REQUEST
    }
}

export const editTodoSuccess = (payload) => {
    return{
        type:EDIT_TODO_SUCCESS,
        payload:payload
    }
}

export const editTodoFailure = (payload) => {
    return{
        type:EDIT_TODO_FAILURE,
        payload:payload
    }
}

export const editTodo = (payload,id) => (dispatch) => {
    dispatch( editTodoRequest() )
    const config = {
        method:"patch",
        url: `https://mock-server-anusha.herokuapp.com/tasks/${id}`,
        data:payload

    }

    return axios(config)
            .then( (res) => dispatch( editTodoSuccess( {message:" edited successfully"} ) ) )
            .catch( (err) => dispatch( editTodoFailure({message: "edit todo failed"}) ) )
}

export const filterData = () => {
    return{
        type:FILTER_DATA
    }
}