
import React from "react";

import { Button, Card } from "@mui/material";
import { ExitToApp, AssignmentInd } from '@mui/icons-material';


import {Link} from 'react-router-dom';

import './intro.css';



const Intro = ({isLoggedIn}) => {


    return (
        <div className="intro">

        <Card className="intro-card">

            <h1>Welcome to LinkedHU CENG </h1>

            <p>LinkedHU is a social network application that connects students, academics and administrators to each other.</p>

            <p>If you are new to LinkedHU CENG, please click on <b>Register</b>, otherwise, click on <b>Login</b>.</p>   


            <div style={{"display":"flex", "justifyContent":"center", marginTop:"8px"}}>
                <Button variant="contained" color="info"
                        sx={{padding:"8px", margin:"8px"}}
                        >
                    <AssignmentInd sx={{mr: 1.2}}/>
                    <Link to="/register" className="app-nav-link">Register</Link>
                </Button>
                <Button variant="contained" color="info"
                         sx={{padding:"8px", margin:"8px"}}
                        >
                    <ExitToApp sx={{mr: 1.2}} />
                    <Link to="/login" className="app-nav-link">Login</Link>
                </Button>
            </div>  

        </Card>
        </div>
        

    );
}

export default Intro;