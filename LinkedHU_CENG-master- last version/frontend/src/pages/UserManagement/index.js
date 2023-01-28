import {useContext, useEffect, useState} from 'react';

import {Card, List, ListItem,IconButton, ListItemText, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button} from '@mui/material';
import {DeleteForever, Edit, Lock} from '@mui/icons-material';

import { ApplicationContext } from '../../common/context';
import { enableUserPost, getAllUsers,deleteUser,  resetPasswordFetch } from '../../common/methods';
const UserManagement = () => {


    const [users, setUsers] = useState([]);
    const { user, setSnackbarInfo} = useContext(ApplicationContext).contextMethods;
    const [open, setOpen] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    const handleClose = () => {
        setOpen(false);
    }

    const enableUser = async(email) => {
    
        try {
            const res = await enableUserPost(email);
            if(res?.message === 'OK') {
                setSnackbarInfo({
                    open: true,
                    message: 'User Enabled',
                    variant: 'success',
                });

                window.location.reload();

            }

            else {
                throw new Error(res.message);
            }

        }
        catch(err) {
            setSnackbarInfo({
                open: true,
                message: err.message,
                variant: 'error',
            });
        }
    }

    const removeUser = async(email) => {
        try {
            const res = await deleteUser({email});
            if(res?.message === 'OK') {
                setSnackbarInfo({
                    open: true,
                    message: 'User Deleted',
                    variant: 'success',
                });

                window.location.reload();

            }

            else {
                throw new Error(res.message);
            }
        }
        catch(err) {
            setSnackbarInfo({
                open: true,
                message: err.message,
                variant: 'error',
            });
        }
    }

    const resetPassword = async (username, password) => {
        
        try {
            const res = await resetPasswordFetch(username, password);
            if(res?.message === 'OK') {
                setSnackbarInfo({
                    open: true,
                    message: 'Password Reset Successfully',
                    variant: 'success',
                });
            }
            else {
                throw new Error(res.message);
            }

        }
        catch(err) {
            setSnackbarInfo({
                open: true,
                message: err.message,
                variant: 'error',
            });
        }
    }

    useEffect(() => {

        getAllUsers().then(res => {
            setUsers(res.filter(user => user.usertype.toLocaleLowerCase() !== 'admin'));
        });

    }, []);




    return (

        <div className="login">

        <Card className="login-card">
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To reset the user's password, enter the new password below.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => {
                resetPassword(currentUser.email, newPassword);
                handleClose();
              }}>Change</Button>
            </DialogActions>
        </Dialog>
        <List sx={{ width: '100%' }}>
                {users.map((user, index) => (
                    <ListItem key={index} style={{
                        
                        borderBottom: '1px solid #e0e0e0',
                        padding: '10px',
                        margin: '10px',
                        backgroundColor: '#fafafa',
                        borderRadius: '5px',
                        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)',
                        width: '100%',
                        alignItems: 'center',   
                        justifyContent: 'flex-start',


                    }}>
                        <ListItemText primary={user.firstname + " " + user.lastname} secondary={user.email} sx={{flexGrow: 1}}/>
                        <ButtonGroup size="small" variant="outlined" color="primary" aria-label="small outlined primary button group"
                            style={{marginLeft:"20px"}}>
                                
                                {!user.enabled ? <IconButton color="primary" onClick={() => {
                                        
                                        enableUser(user.email);
                                }}>
                                    <Lock />
                                </IconButton> :null}

                                <IconButton color="primary" onClick={() => {
                                    setCurrentUser(user);
                                    setOpen(true);

                                }}>

                                    <Edit />

                                </IconButton>

                                <IconButton color="error" onClick={() => {
                                    removeUser(user.email);
                                }}>
                                    <DeleteForever />
                                </IconButton>



                        </ButtonGroup>

                    </ListItem>
                ))}
            </List>
        </Card>

        </div>
    )
    
}

export default UserManagement;