import { DeleteForever, Download, Edit, Visibility } from '@mui/icons-material';
import { Button, ButtonGroup, Card, IconButton, List, ListItem, ListItemText } from '@mui/material';
import {useState, useEffect, useContext} from 'react';
import { ApplicationContext } from '../../common/context';
import { deleteFileAPI, downloadFileFetch, getAllFiles } from '../../common/methods';

const FileManagement = () => {

    const [files, setFiles] = useState([]);

    const { user, setSnackbarInfo } = useContext(ApplicationContext).contextMethods;

    const deleteFile = async (id) => {

        try {
            const res = await deleteFileAPI(id);

        if(res?.message === 'OK') {
            setSnackbarInfo({
                open: true,
                message: 'File Deleted',
                variant: 'success',
            });
            setFiles(files.filter(file => file.id !== id));
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

    const downloadFile = async (id) => {

        try {
            const res = await downloadFileFetch(id);

            const fileName = files.find(file => file.id === id).filename;
            if(res) {
                
            const bytes = new Uint8Array(res);

            const blob = new Blob([bytes], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            
            setSnackbarInfo({
                open: true,
                message: 'File Downloaded',
                variant: 'success',
            });


        }}
        catch(err) {
            setSnackbarInfo({
                open: true,
                message: err.message,
                variant: 'error',
            });
        }
    }
    const deleteAllFiles = async () => {
        try {
            
            for(let i = 0; i < files.length; i++) {
                await deleteFile(files[i].id);
            }
            setSnackbarInfo({
                open: true,
                message: 'All Files Deleted',
                variant: 'success',
            });
            setFiles([]);
        }
        catch(err) {
            setSnackbarInfo({
                open: true,
                message: err.message,
                variant: 'error',
            });
        }
    }


    useEffect( () => {

        getAllFiles({username: user.email}).then(res => {
            setFiles(res);
        });
        
    }, []);



    return (
        <div className="login">
        <Card className="login-card">
        <List sx={{ width: '100%' }}>

                {files.length > 0 ?
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group"  style={{marginBottom:"1rem", float:'right'}}>
                    <Button variant="contained" color="primary" onClick={deleteAllFiles}>
                   Delete All</Button>
                </ButtonGroup> : <h2>No such file</h2>}


                {files.map((file, index) => (
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
                        <ListItemText primary={file.filename} secondary={file.description} sx={{flexGrow: 1}}/>
                        <ButtonGroup size="small" variant="outlined" color="primary" aria-label="small outlined primary button group"
                        style={{marginLeft:"20px"}}
                        >
                                <>
                                
                                <IconButton color="primary" onClick={() => {
                                    
                                    downloadFile(file.id);
                                }}>
                                    <Download />
                                </IconButton>
                                <IconButton color="error" onClick={() => {
                                    deleteFile(file.id);

                                }}>
                                    <DeleteForever />
                                </IconButton>
                                </>


                        </ButtonGroup>


                    </ListItem>
                ))}
            </List>
        </Card>

        </div>
    )

}

export default FileManagement;