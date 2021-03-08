import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Navbar } from '../Components/Navbar'
import { CreateTaskPage } from '../Pages/CreateTaskPage'
import { EditTaskPage } from '../Pages/EditTaskPage'
import { Home } from '../Pages/Home'
import { Login } from '../Pages/Login'
import { Register } from '../Pages/Register'
import { PrivateRoutes } from './PrivateRoutes'

export const Routes = () => {
    return (
        <div>
            <Route path = "/"  component = {Navbar} />
            
            <Switch>
                <Route path = "/login" exact render = { () => <Login/> } />
                <Route path = "/register" exact component = {Register} />
                <PrivateRoutes path = "/" exact  Component = {Home} />
                <PrivateRoutes path = "/create-task" exact  Component = {CreateTaskPage} />

                {/* <Route path = "/" exact  component = {Home} /> */}


                {/* <Route path = "/create-task" exact component = {CreateTaskPage} /> */}
                <Route path = "/edit-todo/:id" exact component = {EditTaskPage} />
            </Switch>

        </div>
    )
}
