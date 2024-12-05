import { createContext, useContext } from 'react';
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import { types, NotificationContext } from './NotificationContext';
import axios from '../api/axios'

import * as authService from '../services/authService';
import Path from '../paths';
import usePersistedState from '../hooks/usePersistedState';
const REGISTER_URL = '/auth/register';
const LOGIN_URL = '/auth/login';

const AuthContext = createContext();

export const AuthProvider = ({ 
    children
 }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = usePersistedState('auth', {});
  const [token, setToken] = usePersistedState('token', {});
  const { showNotification } = useContext(NotificationContext);

  const loginSubmitHandler = async (values) => {
    try {
        const response = await axios.post(LOGIN_URL,
            JSON.stringify({email: values.email, password: values.password}),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
        );

        if (!response || !response.data.accessToken) {
            throw new Error('Wrong email or password!');
        }

        setAuth(response.data.userData);
        setToken(response.data);
        localStorage.setItem('accessToken', response.data.accessToken);
        showNotification('You logged in successfully!', types.success);
  
      navigate(Path.Home);
    } catch(err) {
        if (!err?.response) {
            err.message = 'No server response';
        } else if (err.response?.status == 400) {
            err.message = 'Wrong email or password!!!';
        } else {
            err.message = 'Login Failed'; 
        }
        setAuth({});
        setToken({});
        localStorage.removeItem('accessToken');
        const errorMessage = err instanceof Error ? err.message : 'Login error';
        showNotification(errorMessage, types.error);
    }
     
  };

  const registerSubmitHandler = async (values) => {
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({name: values.name, email: values.email, phone: values.phone, password: values.password, confirmPassword: values.confirmPassword}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            // console.log(response);
            // console.log(response.xsrfCookieName);
            // console.log(JSON.stringify(response));
            // const result =  await authService.register(values.name, values.email, values.phone, values.password, values.confirmPassword);
            setAuth(response.data.userData);
            setToken(response.data);
            // console.log(result.body);
            

            localStorage.setItem('accessToken', response.data.accessToken);
            showNotification('Your registration was successful!', types.success);
            navigate(Path.Home);
        } catch (err) {
            if (!err?.response) {
                console.log('No server response');
            } else if (err.response?.status == 400) {
                console.log("Email already taken!!!");
            } else {
                console.log("Registration Failed"); 
            }
          setAuth({})
          setToken({});
          localStorage.removeItem('accessToken');
        //   console.log(err.message)
          showNotification(err.message, types.error);
        }
  };

  const logoutHandler = () => {
    setAuth({});
    setToken({});
    localStorage.removeItem('accessToken');
    navigate(Path.Home);
  };

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    loggedUserId: auth._id,
    // username: auth.username || auth.email,
    email: auth.email,
    isAuthenticated: !!token.accessToken,
    userId: auth._id,
    name: auth.name,
    phone: auth.phone,
  };
  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  ) 
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;