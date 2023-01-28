
import { useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Intro from './pages/Intro';
import Register from './pages/Register';

import Navbar from './components/Navbar';

import { ApplicationContext } from './common/context';

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';


import {loadUserData} from './common/methods';


import './App.css';
import ForgotPassword from './pages/ForgotPassword';
import HomePage from './pages/Home/home';
import Announcements from './pages/Home/announcements';
import DocumentUploader from './pages/Home/documentUploader';
import AdvertPublisher from './pages/Home/advertPublish';
import Profile from './pages/Profile';
import FileManagement from './pages/FileManagement';
import UserManagement from './pages/UserManagement';

function App() {

  const [snackbarInfo, setSnackbarInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(loadUserData());


  const [contextMethods, setContextMethods] = useState({
    setSnackbarInfo,
    isLoggedIn,
    setIsLoggedIn,
    user,
    refreshUser: () => setUser(loadUserData())
  });


  useEffect(() => {
    setUser(loadUserData());
  }, []);

  useEffect(() => {
  
    if(user && user.expiresIn > Date.now()) {
      setIsLoggedIn(true);
    }
  }, [user]);

return (
    <ApplicationContext.Provider value={{contextMethods, setContextMethods}}>
      <header className="App-header">
        <Navbar isLoggedIn={isLoggedIn} />  

        <Snackbar
          open={snackbarInfo.open}
          autoHideDuration={3000}
          message={snackbarInfo.message}
          onClose={() => setSnackbarInfo({...snackbarInfo, open: false})}
        >
          <Alert severity={snackbarInfo.variant}>
            {snackbarInfo.message}
          </Alert>
          </Snackbar>
          
          
      </header>

      <div className="home-container">
            <div className="home-content">
            {!isLoggedIn ? 
        (
            <Routes>
            <Route path="/" exact element={ <Intro />} />
            <Route path="/login" element={ <Login/>} />
            <Route path="/register" element={ <Register/>} />
            <Route path="/forgot-password" element={ <ForgotPassword />} />
        </Routes>
        )
        :
        (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/upload" element={<DocumentUploader/>} />
            <Route path="/publish" element={<AdvertPublisher/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/files" element={<FileManagement/>}/>
            <Route path="/users" element={(user && user.userType === 'admin') ? <UserManagement/> : <div>You are not authorized to view this page</div>}/>
          </Routes>

        )
        }
               
            </div>
        </div>
        
    <footer>
      <p>
        Copyright &copy; 2022 LinkedHU CENG. TeamScript. All rights reserved.
      </p>

    </footer>
    </ApplicationContext.Provider>
  );
}

export default App;
