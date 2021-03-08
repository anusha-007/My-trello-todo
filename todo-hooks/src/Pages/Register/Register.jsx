import React,{useState} from 'react'
import { useMergeState } from '../../CustomHooks/useMergeState';
import { registerUser } from '../../Redux/register/actionCreators';
import { useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import styles from "./styles.module.css"
import { Notifications } from '../../Components/Notifications';

export const Register = () => {

    const initState={
        name:"",
        email:"",
        password:"",
        username:"",
        mobile:"",
        description:""

    }

    const [open,setOpen] = useState(false)

    const [state,setState] = useMergeState(initState)
    const dispatch = useDispatch()
    const history = useHistory()

    const message = useSelector(state => state.register.message)
    const loading = useSelector(state => state.register.loading)
    const error = useSelector(state => state.register.error)


    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({
            [name]: value,
        });
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        let {name,email,password,username,mobile,description} = state;

        let payload = {
            name,email,password,username,mobile,description }

       dispatch( registerUser(payload) )
       setOpen(true)
       setTimeout( () => {
        !error && history.push("/login")

    }, 2000)

    }
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };


    const  {name,email,password,username,mobile,description} = state;
    return (
        <>
          <form onSubmit = {handleSubmit} >
                <div className = {styles.user_form}>
               
                    <label>Name:</label>
                    <input 
                      required
                      type="text"
                      name="name"
                      placeholder="name"
                      value={name}
                      onChange={handleChange} />
                </div>

                <div className = {styles.user_form}>
                    <label>Email:</label>
                    <input 
                       required
                      type="email"
                      name="email"
                      placeholder="email"
                      value={email}
                      onChange={handleChange} />
                </div>

                <div className = {styles.user_form}>
                    <label>password:</label>
                    <input 
                      required
                      type="text"
                      name="password"
                      placeholder="password"
                      value={password}
                      onChange={handleChange} />
                </div>

                <div className = {styles.user_form}>
                    <label >username:</label>
                    <input 
                      required
                      type="text"
                      name="username"
                      placeholder="username"
                      value={username}
                      onChange={handleChange} />
                </div>

                <div className = {styles.user_form}>
                    <label>mobile:</label>
                    <input 
                      required
                      type="number"
                      name="mobile"
                      placeholder="mobile"
                      value={mobile}
                      onChange={handleChange} />
                </div>

                <div className = {styles.user_form}>
                    <label >description:</label>
                    <input 
                      required
                      type="text"
                      name="description"
                      placeholder="description"
                      value={description}
                      onChange={handleChange} />
                </div>
                <input type="submit"
                 value =  "submit"/>
            </form> 
            <div>
                {!loading && error === false && (
                    <Notifications
                        open={open}
                        handleClose={handleClose}
                        message={message}
                        severity="success"
                    />
                )}

                {error && (
                    <Notifications
                        open={open}
                        handleClose={handleClose}
                        message={message}
                        severity="error"
                    />
                )}
            </div>
            {
                loading && <div>loading pls wait</div>
            }
            {/* <div>{message}</div> */}
             
        </>
    )
}
