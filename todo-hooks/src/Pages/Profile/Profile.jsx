import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import { fetchUserDetails } from '../../Redux/profile/actionCreators'
import {Box, Container,Button,Paper, Avatar, Typography, Divider} from "@material-ui/core"


export const Profile = ({classes}) => {

    const profileData = useSelector( state => state.profile.profileData )
    const loading = useSelector( state => state.profile.loading )
    const error = useSelector( state => state.profile.error)
    const token = useSelector( state => state.login.token)
    const username = useSelector( state => state.login.currentUser)


    const dispatch = useDispatch()

    React.useEffect( () => {
        const payload = {
            username,
            token
       }
       dispatch( fetchUserDetails(payload) )
    }, [])
    return (
        <>
            { loading ? <div>...loading</div> : (
                <div>
                        
                        <strong>Profile Details</strong>
                        
                        
                        <Box className = {classes.profile}>
                            <Avatar src="/broken-image.jpg" />
                            <Typography component = "h4">name:{profileData.name}</Typography>
                            <Typography component = "h5">email:{profileData.email}</Typography>

                            <Typography component = "h5">mobile:{profileData.mobile}</Typography>

                        {/* <h1>name: {profileData.name}</h1>
                        <h1>email:{profileData.email}</h1>
                        <h1>mobile:{profileData.mobile}</h1>
                        <h1>description:{profileData.description}</h1> */}
                        </Box>
                        <Divider/>
                            
               </div>)
            }

            {error && <div> something went wrong</div>}
        </>
    )
}
