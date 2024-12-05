import * as request from '../lib/request';

const BASE_URL = 'http://localhost:3030/auth'
// const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

export const login = async (email, password) => {
    try {
        const result = await request.post(`${BASE_URL}/login`, {
            email,
            password,
        });
        return result;
    } catch (error) {
        console.log(error.message);
    }
  
};
export const register = (name, email, phone, password, confirmPassword) => {
    const options = {
        url: `${BASE_URL}/register`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            phone,
            password,
            confirmPassword
        })
    };

    return options;
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

    } catch (error) {
        console.log(error.message);
    }
} 