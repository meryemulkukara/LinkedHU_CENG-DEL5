import  React,{useContext, useState}  from 'react'


import {Card, Box, Button, TextField, LinearProgress, Checkbox} from '@mui/material';

import FileOpenIcon from '@mui/icons-material/FileOpen';
import { ApplicationContext } from '../../common/context';
import { API_URL } from '../../common/constants';
const DocumentUploader = () => {

    const [rawFile, setRawFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isProgress, setIsProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { user, setSnackbarInfo } = useContext(ApplicationContext).contextMethods;

    const openFile = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    }
    const handleFile = (event) => {
        const file = event.target.files[0];

        if(file.size > 100*1024*1024) {
            setSnackbarInfo({
                open: true,
                message: 'File size should be less than 100MB',
                variant: 'error',
            });
            return;
        }

        setRawFile(file);
        setFileName(file.name);
        
    }

    const upload = async () => {

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('fileName', fileName);
        formData.append('owner', user.email);
        formData.append('file', rawFile);
        
        setIsProgress(true);
        const response = await fetch(`${API_URL}/material/upload`, {
            method: 'POST',
            body: formData,
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // }

        });
        
        const res = await response.json();

        if(res.message === 'OK'){
            setSnackbarInfo({
                open: true,
                message: 'File uploaded successfully',
                variant: 'success',
            });

        }
        else{
            setSnackbarInfo({
                open: true,
                message: 'Error ' + res.message,
                variant: 'error',
            });
        }
        
        setIsProgress(false);

    
    }


    return (
        <div className="login" style={{width:"100%"}}>
            <Card className="login-card">

                <h2>Upload Material</h2>
                
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <TextField
                            id="standard-basic"
                            label="Title"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        <TextField
                            id="standard-basic"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            
                            multiline
                            rows="6"
                            onKeyPress={() => {}}
                        />

                        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center"
                        
                        padding="10px">
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                fullWidth
                                margin="normal"
                                onKeyPress={() => {}}
                                InputProps={{
                                    readOnly: true,
                                }}
                                style={{
                                    width: "300px",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    cursor: "pointer",
                                    marginRight: "10px"
                                }}
                                value={fileName}
                                placeholder="Select file"
                            />
                            <Button variant="contained" color="primary" sx={{margin: "8px",backgroundColor: "#141932"}} onClick={openFile}>
                                <input type="file" id="fileInput" style={{display: "none"}} onChange={handleFile}/>
                                <FileOpenIcon sx={{mr:1.2}} />
                                Browse
                            </Button>
                        
                        </Box>
                        
                        {isProgress &&  <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="indeterminate" color="secondary" />
                        </Box>}

                        <Button variant="contained" color="primary" sx={{margin: "8px", width: "100%", backgroundColor: "#141932"}} onClick={upload}>
                            {isProgress ? 'Uploading...' : 'Upload'}
                        </Button>


                    </Box>
                </Box>
            </Card>
        </div>

    )
}

export default DocumentUploader;