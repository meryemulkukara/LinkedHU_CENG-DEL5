import React, {useContext, useEffect, useState} from "react";


import { Card, 
         Grid, 
         Container, 
         Typography, 
         Avatar, 
         CardContent,
         CardActions, 
         Button, 
         TextField,
         ButtonGroup,
         Dialog,
         DialogTitle,
         DialogContent,
         DialogContentText,
         DialogActions} from "@mui/material";

import CssBaseline from '@mui/material/CssBaseline';

import { ApplicationContext } from "../../common/context";

import './profile.css';
import { deleteUser, profile, updateUser } from "../../common/methods";
import { Link } from "react-router-dom";

const Profile = () => {

    
const {contextMethods} = useContext(ApplicationContext);

const { user ,setSnackbarInfo, refreshUser, setIsLoggedIn} = contextMethods;
const [userData, setUserData] = useState({
    email: user.email
}); 
const [image, setImage] = React.useState("./static/img/user.jpg");
const [currentPass, setCurrentPass] = useState('');
const [newPass, setNewPass] = useState('');


const handleImage = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
};

const [dialogInfo, setDialogInfo] = useState({
    open: false, 
    agree: false
  });

const dialogHandleClose = async (event) => {
    setDialogInfo({
        ...dialogInfo,
        open: false
    });

    if(event.target.innerText.toLocaleLowerCase() === 'yes') {
        const res = await deleteUser({email: user.email});
        

        if(res?.status === 'error') {
            setSnackbarInfo({
                open: true,
                message: res.message,
                variant: 'error'
            });
        } else {
            
            setSnackbarInfo({
                open: true,
                message: 'Account Deleted',
                variant: 'success'
            });
            setIsLoggedIn(false);
            localStorage.removeItem('userData');
           
            setTimeout(() => {
                refreshUser();
                window.location.href = '/';
            }, 1000);
        }
    }
}

const submit = async() => {
    const res = await updateUser(user.email, {
        firstname: userData.firstname,
        lastname: userData.lastname,
        username: userData.email,
        currentPassword: currentPass,
        newPassword: newPass.trim().length > 0 ? newPass : null
    });
    if(res?.id) {
        setSnackbarInfo({
            open: true,
            message: 'Profile Updated',
            variant: 'success',
        });
        setUserData({email: user.email});
        
        setTimeout(() => {
            window.location.reload();
        },1000);
    }
    else {
        setSnackbarInfo({
            open: true,
            message: res.message,
            variant: 'error',
        });
    }
}

useEffect(() => {
 profile({email: user.email}).then(res => {
     setUserData(res);
 }).catch(err => {
     console.log(err);
 });
 }, [user.email]);

return (

    
    <Card style= {{
        border: "1px solid #e0e0e0",
        borderRadius: "5px",
        boxShadow: "0 1px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)",
        width: "500px",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10px",
    }}>

<Dialog
        open={dialogInfo.open}
        onClose={dialogHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogInfo.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogInfo.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={dialogHandleClose}>Yes</Button>
          <Button color="error" onClick={dialogHandleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="paper">
                <form className="form" noValidate>
                    <Grid item xs={12}>
                    <br/>
                    <br/>
                        <Card>
                            <CardContent>
                                
                                <div className="details">
                                    <div style={{flexGrow:1}}>
                                        <Typography  gutterBottom variant="h5" >
                                            {userData.firstname} {userData.lastname}
                                        </Typography>
                                        <Typography
                                        color="textSecondary"
                                        variant="body1" 
                                        >
                                            LinkedHU CENG
                                        </Typography>
                                    </div>
                                    <Avatar style={{height:"150px" , width:"150px" , justifyContent:"flex-end"}} src={image}></Avatar>
                                </div>
                            </CardContent>
                            
                            
                            <CardActions>
                            <input
                                accept="image/*"
                                className="input"
                                id="contained-button-file"
                                multiple={false}
                                onChange={handleImage}
                                type="file"
                                name= "image"
                            />
                            
                            
                            </CardActions>
                        </Card>
                    </Grid>
                    <br></br>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                        <TextField
                            inputProps={{ autoComplete:'off',form: {autoComplete: 'off', }}}

                            name="firstName"
                            variant="standard"
                            required
                            fullWidth
                            value={userData.firstname}
                            onChange={(event) => setUserData({...userData, firstname: event.target.value})}
                            id="firstname"
                            label="First Name"
                        />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                        <TextField
                            inputProps={{ autoComplete:'off',form: {autoComplete: 'off', }}}

                            name="lastName"
                            variant="standard"
                            required
                            fullWidth
                            value={userData.lastname}
                            onChange={(event) => setUserData({...userData, lastname: event.target.value})}
                            id="lastname"
                            label="Last Name"
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="standard"
                            required
                            fullWidth
                            type="text"
                            id="email"
                            onChange={(event) => setUserData({...userData, email: event.target.value})}
                            value={user.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            label="Email Address"
                            name="email"
                            
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="standard"
                            fullWidth
                            type="text"
                            id="userType"
                            value={userData.usertype}
                            InputProps={{
                                readOnly: true,
                              }}
                            label="User Type"
                            name="userType"
                            
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="currentPassword"
                            label="Current Password"
                            type="password"
                            id="currentPass"
                            onChange={(event) => setCurrentPass(event.target.value)}
                            value={currentPass}
                            
                            
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="newPassword"
                            
                            label="New Password"
                            type="password"
                            id="newPassword"
                            autoComplete='nope'
                            onChange={(event) => setNewPass(event.target.value)}
                            value={newPass}
                        />
                        </Grid>
                        
                        <ButtonGroup fullWidth style={{
                            marginTop: "10px",
                            marginBottom: "10px",
                        }}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="inherit"
                            
                            style={{
                                borderRadius: "5px",
                                margin: "8px",
                            }}
                            >
                            <Link to="/" style={{textDecoration: "none"}}> Back </Link>
                            </Button>
                            <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{
                                borderRadius: "5px",
                                margin: "8px",
                            }}
                            onClick={submit}
                            >
                            Save
                            </Button>
                            <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="error"
                            style={{
                                borderRadius: "5px",
                                margin: "8px",
                            }}
                            onClick={() => {
                                setDialogInfo({
                                    open: true,
                                    title: "Delete Account",
                                    message: "Are you sure you want to delete your account?",
                                    agree: dialogInfo.agree
                                });
                            }}
                            >
                            Delete
                            </Button>
                        </ButtonGroup>
                        
                    </Grid>
                    
                </form>
            </div>
            </Container>
        </Card>
    
    );
}

export default Profile;