import * as request from '../lib/request';
import axios from '../api/axios'
const REGISTER_URL = '/auth/register';
const LOGIN_URL = '/auth/login';

const BASE_URL = 'http://localhost:3030/auth'
// const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

export const login = async (email, password) => {
    try {
         const response = await axios.post(LOGIN_URL,
                    JSON.stringify({email, password}),
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                );

        return response;
    } catch (error) {
        return error;
        // console.log(error.message);
    }
};

export const register = async (name, email, phone, password, confirmPassword) => {
    try {
        const response = await axios.post(REGISTER_URL,
            JSON.stringify({name, email, phone, password, confirmPassword}),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
        );

        return response;
        
    } catch (error) {
        return error;
    }
};
// export const register = (name, email, phone, password, confirmPassword) => request.post(`${BASE_URL}/register`, {
//     name,
//     email,
//     phone,
//     password,
//     confirmPassword
// });

export const logout = async () => {
    try {
       await request.get(`${BASE_URL}/logout`);
    //    await axios.get(`${BASE_URL}/logout`)
    } catch (error) {
        console.log(error.message);
    }
} 