import * as request from '../lib/request';

// const BASE_URL = 'http://localhost:3030/data/likes'
const BASE_URL = `${import.meta.env.VITE_API_URL}/data/likes`;


export const getAll = async (crystalId) => {
    const whereClause = `where=crystalId%3D%22${crystalId}%22%20AND%20isLiked%3Dtrue`;
    
    const result = await request.get(`${BASE_URL}?${whereClause}`);
    
    return result;
    // const query = new URLSearchParams({
    //     load: `owner=_ownerId:users`
    // });

    // const result = await request.get(`${BASE_URL}?${whereClause}&${query}`);
};

export const getLikeId = async (crystalId, userId) => {
    const whereClause = `where=crystalId%3D%22${crystalId}%22%20AND%20_ownerId%3D%22${userId}%22%20AND%20isLiked%3Dtrue`;
    // const whereClause = `where=crystalId%3D%22${crystalId}%22%20AND%20_ownerId%3D%22${_ownerId}%22%20AND%20isLiked%20IN%20(true,false)`;

        const result = await request.get(`${BASE_URL}?${whereClause}`);
    
        const matchingObject = result.find(item => item.crystalId === crystalId && item._ownerId === userId);
        
        if (matchingObject) {
            return matchingObject;
        } 
};



export const getStatusOfPreviouslyLiked = async (likeId, crystalId, loggedUserId) => {
    const result = await request.get(`${BASE_URL}/${likeId}`);

    if (result._ownerId === loggedUserId && result.crystalId === crystalId && result.isLiked === true) {
        return true;
    } else if (result._ownerId === loggedUserId && result.crystalId === crystalId && result.isLiked === false) {
        return false;
    } else {
        return false;
    }
}

export const like = async (crystalId, isLiked) => {
    const newLike = await request.post(BASE_URL, {
        crystalId,
        isLiked,
    });

    return newLike;
};
export const editPreviouslyLiked = async (likeId, likesData) => {
    const result = await request.put(`${BASE_URL}/${likeId}`, likesData);

    return result;
}

export const dislike = async (likeId, likesData) => {
    const result = await request.put(`${BASE_URL}/${likeId}`, likesData);

    return result;
}