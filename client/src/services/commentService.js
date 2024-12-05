import axios from '../api/axios';
import * as request from '../lib/request';

const COMMENT_URL = '/comment';
// const BASE_URL = 'http://localhost:3030/data/comments'
const BASE_URL = `${import.meta.env.VITE_API_URL}/data/comments`;


export const getAll = async (crystalId) => {

    const response = await axios.get(`${COMMENT_URL}/${crystalId}`,
        {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }
    );
    // const query = new URLSearchParams({
    //     where: `crystalId="${crystalId}"`,
    //     load: `owner=_ownerId:users`
    // });
    
    // const result = await request.get(`${BASE_URL}?${query}`);
    
    // const result = await request.get(BASE_URL);
    // return result.filter(comment => comment.crystalId === crystalId);
    return response;
}

export const create = async (crystalId, text, userId) => {

    const response = await axios.post(`${COMMENT_URL}/create`,
        JSON.stringify({crystal: crystalId, text: text, owner: userId}),
        {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }
    );

    // const newComment = await request.post(BASE_URL, {
    //     crystalId,
    //     text,
    // });

    return response;
};