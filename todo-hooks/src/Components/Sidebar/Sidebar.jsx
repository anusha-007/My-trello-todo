import React from 'react'
import {Box, Container,Button, makeStyles, Divider, Paper, Typography} from "@material-ui/core"
import {green} from "@material-ui/core/colors"
import {Profile} from "../../Pages/Profile"
import { Logout } from '../../Redux/login/actionCreaters'
import {useDispatch,useSelector} from "react-redux"
import { filterData, getTodoData } from '../../Redux/todo/actionCreaters'

const useStyles = makeStyles((theme) => ({
    root:{
        
        border:"16px solid grey",
        display: "flex",
        flexDirection:"column",
        height: "600px"
   
       
    },
    avatar: {
        backgroundColor:green[400]
    },
    profile:{
        margin: "auto"
        // marginTop:"10px"

    },
    paper:{
        margin:theme.spacing(2),
        '& > *': {
            margin: theme.spacing(1),
          }
    },
    logout:{
        display: "flex",
        flexDirection:"column",
       
        alignItems:"flex-end"
    }
}))

export const Sidebar = () => {
    const classes = useStyles()

    const all = useSelector(state => state.todo.all)
    const personal = useSelector(state => state.todo.personal)
    const official = useSelector(state => state.todo.official)
    const others = useSelector(state => state.todo.others)


    
    const dispatch = useDispatch()

    const handleLogout = () => {
        
        dispatch(Logout())
    }

    
    return (
        <Container component = "div" className = {classes.root}>
            <Box>
               <Profile classes = {classes}/>
               
           </Box>
           <Divider/>
           

           <Box className = {classes.paper}>
               <Paper variant = "outlined" square>
                   <Typography>All --- {all}</Typography>
                   <Typography>
                       
                   </Typography>
                </Paper>
               <Paper variant = "outlined" square>
                <Typography>PERSONAL --- {personal}</Typography>
                <Typography>
                       
                   </Typography>
               </Paper>
               <Paper variant = "outlined" square>
                    <Typography>OFFICIAL --- {official}</Typography>
                    <Typography>
                            
                    </Typography>
               </Paper>
               <Paper variant = "outlined" square >
                   <Typography>
                       OTHERS --- {others}
                   </Typography>
                   <Typography>

                   </Typography>
               </Paper>

           </Box>
           {/* <Box>
               <Button onClick = {handleLogout} className = {classes.logout} variant = "contained" color = "secondary" >Logout</Button>
           </Box> */}

        </Container>
        
    )
}
