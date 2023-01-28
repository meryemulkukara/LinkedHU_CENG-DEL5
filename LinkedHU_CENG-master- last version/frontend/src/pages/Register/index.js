import React, {useContext, useState} from "react";

import { Link } from "react-router-dom";

import { Box, Card, 
    ToggleButtonGroup, ToggleButton, 
    TextField, 
    Button } from '@mui/material';


import {switchAlignment} from '../../common/helpers';
import { ApplicationContext } from "../../common/context";
import { register } from "../../common/methods";

const Register = () => {

  const checkEmail = (email) => userInfo.email.length > 0 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userInfo.email);

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    
    const { setSnackbarInfo } = useContext(ApplicationContext).contextMethods;
    
    const [alignment, setAlignment] = useState('student');
    const [studentType, setStudentType] = useState('bachelor');


    const submit = async () => {
      
      if(checkEmail(userInfo.email)) {
        setSnackbarInfo({
          open: true,
          message: 'Please enter a valid email',
          variant: 'error'
        });
        return;
      }

      if(userInfo.password.length < 8) {
        setSnackbarInfo({
          open: true,
          message: 'Password must be at least 8 characters',
          variant: 'error'
        });
        return;
      }

      if(userInfo.firstName.length < 1 || userInfo.lastName.length < 1) {
        setSnackbarInfo({
          open: true,
          message: 'Please enter your first and last name',
          variant: 'error'
        });
        return;
      }


      const res = await register(userInfo.firstName, userInfo.lastName, userInfo.email, userInfo.password, alignment, alignment === 'student' ? studentType : null);

      if(res?.id) {
        setSnackbarInfo({
          open: true,
          message: 'Registration successful',
          variant: 'success'
        });
        setUserInfo({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
        
        // wait 5 seconds before redirecting
        setTimeout(() => {
          window.location.href = '/login';
        }
        , 2 * 1000);
      } else {

        setSnackbarInfo({
          open: true,
          message: res?.message,
          variant: 'error'
        });


      }
    
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            submit();
        }
    }

    return (
        <div className="login">
            <Card className="login-card">

                
               {switchAlignment (alignment, {fontSize: '40px', color:"#7A5D81"})}

                <h2>Register</h2>

                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={(event, newAlignment) => setAlignment(newAlignment || alignment)}>
                      
                    <ToggleButton style={{borderRadius: "0px"}} value="student" ><b>Student</b></ToggleButton>
                    <ToggleButton style={{borderRadius: "0px"}} value="academic"><b>Academic</b></ToggleButton>
                    <ToggleButton style={{borderRadius: "0px"}} value="graduate" ><b>Graduate</b></ToggleButton>
                </ToggleButtonGroup>

                <Box sx={{display: "flex", marginTop: "8px", flexDirection: "column", width:"100%"}} onSubmit={() => console.log("hello")}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoComplete="false"
                        autoFocus
                        value={userInfo.firstName}
                        onChange={(event) => setUserInfo({...userInfo, firstName: event.target.value})}
                        onKeyPress={handleEnter}
                        
                    />

                    
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        autoComplete=""
                        value={userInfo.lastName}
                        onChange={(event) => setUserInfo({...userInfo, lastName: event.target.value})}
                        onKeyPress={handleEnter}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      autoComplete=""
                      value={userInfo.email}
                      onChange={(event) => setUserInfo({...userInfo, email: event.target.value})}
                      onKeyPress={handleEnter}
                      error={checkEmail(userInfo.email)}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password (min. 8 characters)"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(event) => setUserInfo({...userInfo, password: event.target.value})}
                      onKeyPress={handleEnter}

                    />

                      {alignment === 'student' &&
                         <ToggleButtonGroup

                         style={{margin: "8px 0px 8px 0px", justifyContent: "center"} }
                           color="primary"
                           value={studentType}
                           exclusive
                           onChange={(event, newStudentType) => setStudentType(newStudentType || studentType)}
                           
                           
                           >
                             <ToggleButton style={{borderRadius: "0px"}} value="bachelor" ><b>Bachelor</b></ToggleButton>
                             <ToggleButton style={{borderRadius: "0px"}} value="master" ><b>Master</b></ToggleButton>
                             <ToggleButton style={{borderRadius: "0px"}} value="phd" ><b>PhD</b></ToggleButton>
       
       
       
                         </ToggleButtonGroup>}
                    

                    <div style={{display: 'flex', flexDirection:"row", justifyContent: 'space-between'}}>
                       
                        <Link to="/login" style={{textDecoration: 'none'}}> Have an account already?</Link>

                    </div>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, p: 1.1, backgroundColor: "#141932 !important" }}
                      onClick={() => submit()}
                    >
                      Sign up
                    </Button>
                </Box>
            </Card>
        </div>
    );
}

export default Register;