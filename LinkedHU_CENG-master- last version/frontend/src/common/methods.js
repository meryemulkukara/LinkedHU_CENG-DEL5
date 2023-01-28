import { deleteFetch, getFetch, postFetch, putFetch, fileFetch } from '../api/useFetch';

export const loadUserData = () => {
    return JSON.parse(localStorage.getItem('userData'));
}
  
export const saveUserData = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
}
  
export const login = async (username, password, userType, isRememberMe) => {
  try {
      
    const res = await postFetch(`login`,{username, password, userType});
    
    if (res?.id) {
      const userDTO = {
        id: res.id,
        email: res.email,
        userType: res.usertype.toLocaleLowerCase(),
        expiresIn: isRememberMe ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) : new Date().getTime() + (1000 * 60 * 60 * 24 * 1)
      };
      return userDTO;
    }
    else {
      throw new Error(res.message);
    }

  }
  catch (err) {
    return {
      status: "error",
      message: err.message
    }
  }
  
}

export const register = async (firstname,lastname,email,password,userType,studentType ) => {



  const payload =  {
    firstname,
    lastname,
    email,
    password,
    userType,
    studentType
  };


  try {
    const res = await postFetch(`register`, payload);

    if (res?.id) {

      return res;
      
    }

    else {
      throw new Error(res.message);
    }
  }
  catch (err) {
    return {
      status: "error",
      message: err.message
    }
  }
}

export const profile = async (username) => {
  
    try { 
      const res = await getFetch(`me`, username);
      if (res?.id) {
        return res;
      }
      else {
        throw new Error(res.message);
      }
    }
    catch (err) {
      return {
        status: "error",
        message: err.message
      }
    }
  }


export const updateUser = async (username, userData) => {

  try {
    const res = await putFetch(`me`, userData);

    if (res?.id) {
      return res;
    }
    else {
      throw new Error(res.message);
    }
  }
  catch (err) {
    return {
      status: "error",
      message: err.message
    }
  }
}

export const deleteUser = async (username) => {
  
    try {
      const res = await deleteFetch(`me`, username);

      if (!res.data) {
        return res;
      }
      else {
        throw new Error(res.message);
      }
    }
    catch (err) {
      return {
        status: "error",
        message: err.message
      }
    }
  }

export const search = async (searchTerm) => {
  try {
    const res = await getFetch(`search`, searchTerm);

    if (res?.length > 0) {
      return res;
    }
    else {
      return [];
    }
  }
  catch (err) {
    return [];
  }
}

export const publishAdvert = async (advert) => {
  
    try {
      const res = await postFetch(`advert/publish`, advert);
  
      if (res?.message === "OK") {
        return res;
      }
      else {
        throw new Error(res.message);
      }
    }
    catch (err) {
      return {
        status: "error",
        message: err.message
      }
    }
}

export const getAllAnnouncements = async () => {
  try {
    const res = await getFetch(`advert/get/all`);

    if (res?.length > 0) {
      return res;
    }
    else {
      return [];
    }
  }
  catch (err) {
    return [];
  }
}

export const deleteAdvert = async (advertId) => {
  try {
    const res = await deleteFetch(`advert/delete/${advertId}`);

    if (res && res === "OK") {
      return res;
    }
    else {
      throw new Error(res.message);
    }
  }
  catch (err) {
    return {
      status: "error",
      message: err.message
    }
  }
}


export const sendEditAdvert = async (advertId, advert) => {
  try {
    const res = await putFetch(`advert/update/${advertId}`, advert);

    if (res && res.message === "OK") {
      return res;
    }
    else {
      throw new Error(res.message);
    }
  }
  catch (err) {
    return {
      status: "error",
      message: err.message
    }
  }
}


export const getAllFiles = async (username) => {
  try {
    const res = await getFetch(`material/all`, username);
    if (res?.length > 0) {
      return res;
    }
    else {
      return [];
    }
  }
  catch (err) {
    return [];
  }
}

export const deleteFileAPI = async (fileId) => {
  try {
    const res = await deleteFetch(`material/delete/${fileId}`);

    if (res && res === "OK") {
      return res;
    }
    else {
      throw new Error(res.message);
    }
  }
  catch (err) {
    return {
      status: "error",
      message: err.message
    }
  }
}


export const downloadFileFetch = async (fileId) => {
  try {
    const res = await getFetch(`material/download/${fileId}`);

    if (res) {
      return res;
    }
    else {
      throw new Error(res.message);
    }
  }
  catch (err) {
    return {
      status: "error",
      message: err.message
    }
  }
}


export const getAllUsers = async () => {
  try {
    const res = await getFetch(`admin/users`);
    if (res?.length > 0) {
      return res;
    }
    else {
      return [];
    }
  }
  catch (err) {
    return [];
  }
}

export const enableUserPost = async (username) => {
  try {
    const res = await postFetch(`admin/enableUser`, {username});

    if (res && res === "OK") {  
      return res;
    }
    else {
      throw new Error(res.message);
    }
  }
  catch (err) {

    console.log(err);
    return {
      status: "error",
      message: err.message
    }
  }
}


export const resetPasswordFetch = async (username, password) => {
  try {
    const res = await postFetch(`admin/sendNewPassword`, {username, password});

    if (res && res === "OK") {
      return res;
    }
    else {
      throw new Error(res.message);
    }
  }
  catch (err) {
    return {
      status: "error",
      message: err.message
    }
  }
}

