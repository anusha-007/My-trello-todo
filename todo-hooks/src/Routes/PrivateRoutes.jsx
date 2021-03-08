import React from 'react'
import {useSelector } from "react-redux"
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoutes = ({Component, ...rest}) => {

    const isAuth = useSelector(state => state.login.isAuth)
    return (
        <div>
            {
              isAuth ? <Route {...rest} render = { () => <Component />} />  : <Redirect to = "/login" />
            
            }
            
        </div>
    )
}
