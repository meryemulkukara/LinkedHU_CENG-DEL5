
import React from 'react';


import { AccountBox, AdminPanelSettings, Person, School } from '@mui/icons-material';
import HomePage from '../pages/Home/home';
import Announcements from '../pages/Home/announcements';
import DocumentUploader from '../pages/Home/documentUploader';
import AdvertPublisher from '../pages/Home/advertPublish';
import Profile from '../pages/Profile';

const switchAlignment = (alignment, sx) => {
    switch (alignment) {
        case 'graduate':
            return <School sx={sx}/>
        case 'student':
            return <AccountBox sx={sx}/>

        case 'admin':
            return <AdminPanelSettings sx={sx}/>
        case 'academic':
            return <Person sx={sx}/>
        default:
            return <AccountBox sx={sx}/>
    }
}

export {
    switchAlignment
}