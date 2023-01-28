import { DeleteForever, Edit, ViewArray, Visibility } from '@mui/icons-material';
import { List, ListItem,Stack,Chip, ListItemText, ButtonGroup, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, ToggleButtonGroup, ToggleButton } from '@mui/material';
import React, {  useContext, useEffect } from 'react';


import { ApplicationContext } from '../../common/context';
import { deleteAdvert, getAllAnnouncements, sendEditAdvert } from '../../common/methods';
const Announcements = () => {

    const [announcements, setAnnouncements] = React.useState([]);
    const { user, setSnackbarInfo } = useContext(ApplicationContext).contextMethods;

    const chipMap = {
        "internship": "primary",
        "scholarship": "secondary",
        "job": "error",
    }

    const [open, setOpen] = React.useState(false);
    const [currentAdvert, setCurrentAdvert] = React.useState(null);
    const [editAdvert, setEditAdvert] = React.useState(null);
    const [editDialog, setEditDialog] = React.useState(false);


    const getAnnouncements = async () => {

        const res = await getAllAnnouncements();
        if(res?.length > 0) {
            setAnnouncements(res.map(item => {
                return {
                    ...item,
                    type: item.type.toLocaleLowerCase()
                }}));
        }
        else {
            setAnnouncements([]);
        }
    }



    const remove = async (id) => {
       
        try{

            const res = await deleteAdvert(id);
            if(res?.message === 'OK') {
                setSnackbarInfo({
                    open: true,
                    message: 'Advert Deleted',
                    variant: 'success',
                });
                window.location.reload();
            } else
                throw new Error(res.message);

        }
        catch(err) {
            setSnackbarInfo({
                open: true,
                message: err.message,
                variant: 'error',
            });
        }
    }

    const edit = async () => {
        try {
            const res = await sendEditAdvert(editAdvert.id, editAdvert);
            console.log(res);
            if(res?.message === 'OK') {
                setSnackbarInfo({
                    open: true,
                    message: 'Advert Edited',
                    variant: 'success',
                });
                setEditDialog(false);
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

    useEffect(() => {
        getAnnouncements();
    },[])


    const dialogHandleClose = () => {
        setOpen(false);
    }

    const editDialogHandleClose = () => {
        setEditDialog(false);
    }
    return (
        <div className="advert-publish-container" >
            <Dialog
        open={editDialog}
        onClose={dialogHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title" >
            {editAdvert?.title}
        </DialogTitle>
        <DialogContent style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }} >
            
            <TextField
                id="standard-basic"
                label="Title"
                value={editAdvert?.title}
                onChange={(e) => {
                    setEditAdvert({...editAdvert, title: e.target.value})
                }}
                autoComplete="off"
                style={{marginBottom: '1rem', width: '100%', marginTop: '1rem'}}
            />
            
            <TextField
                value={editAdvert?.description}
                onChange={(e) => setEditAdvert({...editAdvert, description: e.target.value})}
                autoComplete="off"
                id="standard-basic"
                label="Description"
                multiline
                rows={8}
                style={{marginBottom: '1rem', width: '100%'}}
                
                
            />
            <TextField
                value={editAdvert?.startDate}
                onChange={(e) => setEditAdvert({...editAdvert, startDate: e.target.value})}
                autoComplete="off"
                id="standard-basic"
                label="Start Date"
                style={{marginBottom: '1rem', width: '100%'}}
            />
            <TextField
                value={editAdvert?.endDate}
                onChange={(e) => setEditAdvert({...editAdvert, endDate: e.target.value})}
                autoComplete="off"
                id="standard-basic"
                label="End Date"
                style={{marginBottom: '1rem', width: '100%'}}
            />
           
            <TextField
                value={editAdvert?.contact}
                onChange={(e) => setEditAdvert({...editAdvert, contact: e.target.value})}
                autoComplete="off"
                id="standard-basic"
                label="Contact"
                style={{marginBottom: '1rem', width: '100%'}}
            />
            <TextField
                value={editAdvert?.price}
                onChange={(e) => setEditAdvert({...editAdvert, price: e.target.value})}
                autoComplete="off"
                id="standard-basic"
                label= {editAdvert && editAdvert.type === 'scholarship' ? 'Amount' : 'Salary'}
                style={{marginBottom: '1rem', width: '100%'}}
            />

            <ToggleButtonGroup
                value={editAdvert?.type || 'internship'}
                aria-label="type"
                size="small"
            >   
                <ToggleButton value="scholarship" onClick={() => setEditAdvert({...editAdvert, type: 'scholarship'})}> Scholarship </ToggleButton>
                <ToggleButton value="job" onClick={() => setEditAdvert({...editAdvert, type: 'job'})}> Job </ToggleButton>
                <ToggleButton value="internship" onClick={() => setEditAdvert({...editAdvert, type: 'internship'})}> Internship </ToggleButton>
            </ToggleButtonGroup>


        </DialogContent>
        <DialogActions>
            <Button color="primary" onClick={ editDialogHandleClose }>
                Cancel
            </Button>
            <Button onClick={() => {
                editDialogHandleClose();
                edit();
            }
            } color="secondary" autoFocus>
                Save
            </Button>
        </DialogActions>
      </Dialog>

            <Dialog
        open={open}
        onClose={dialogHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {currentAdvert?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {currentAdvert?.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={dialogHandleClose}>OK</Button>
        </DialogActions>
      </Dialog>
            <div className="advert-publish-content" style={{ alignItems:"flex-start"}}>
            <List sx={{ width: '100%' }}>
                {announcements.map((announcement, index) => (
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
                        <ListItemText primary={announcement.title} secondary={announcement.description}/>
                        <Stack direction="row" spacing={1} 
                            sx={{
                                flexGrow:1}} >
                            <Chip label={announcement.type} color={chipMap[announcement.type]} />
                        </Stack>

                        <ButtonGroup size="small" variant="outlined" color="primary" aria-label="small outlined primary button group"
                        
                        >
                               
                            {user && user.id === announcement.ownerId ? 
                               <>
                                <IconButton color="primary" onClick={() => {

                                    setCurrentAdvert(announcement);
                                    setOpen(true);
                                }} >
                                    <Visibility />
                                </IconButton>
                                <IconButton color="primary" onClick={() => {
                                    
                                    setEditAdvert(announcement);
                                    setEditDialog(true);
                                }}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="error" onClick={() => {
                                    remove(announcement.id);
                                }}>
                                    <DeleteForever />
                                </IconButton>
                                </>
                            : <Button color="primary" variant="contained">
                                
                                <ViewArray sx={{mr:1.2}}/>
                                Apply
                                </Button>}



                        </ButtonGroup>


                    </ListItem>
                ))}
            </List>

            </div>
        </div>
    )
}
export default Announcements;