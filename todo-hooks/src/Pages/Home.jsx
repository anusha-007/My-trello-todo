import React from 'react'
import { DisplayTodo } from '../Components/DisplayTodo/DisplayTodo'
import { Sidebar } from '../Components/Sidebar/Sidebar'
import {useDispatch, useSelector} from "react-redux";
import { filterData, getTodoData } from '../Redux/todo/actionCreaters';

export const Home = () => {


    const dispatch = useDispatch()
    

    React.useEffect( () => {
        dispatch( getTodoData() )
        .then(() => dispatch( filterData() ))
        
    }, [])

    
    return (
        <div>
            home
            to display all todos
            <div style = {{display:"flex"}}>
                
                <div >
                <Sidebar   />
                </div>
                
             <div>
             <DisplayTodo/>

             </div>
            
            </div>
            
        </div>
    )
}
