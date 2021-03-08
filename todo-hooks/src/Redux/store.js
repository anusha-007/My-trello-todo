import { applyMiddleware, combineReducers, createStore,compose } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "./login/loginReducer";
import { profileReducer } from "./profile/profileReducer";
import { registerReducer } from "./register/registerReducer";
import { todoReducer } from "./todo/todoReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers( {todo: todoReducer, login : loginReducer, register: registerReducer, profile:profileReducer})
export const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )