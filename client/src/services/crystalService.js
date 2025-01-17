import * as request from "../lib/request";
import axios from '../api/axios'

const BASE_URL = 'http://localhost:3030'
const CREATE_URL = '/crystal/create';
const CRYSTALS_CATALOG_URL = '/crystal/catalog';
const CRYSTAL_URL = '/crystal';
const HOME_URL = '/';
const SEARCH_URL = '/search';
// const BASE_URL = `${import.meta.env.VITE_API_URL}/crystals`;


export const getAll = async () => {
    let response;
    try {
        response = await axios.get(CRYSTALS_CATALOG_URL,
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
        );
    } catch (error) {
      return error.message
    }
    
    return response.data.crystals;
}

export const getOne = async (crystalId) => {
    // const result = await request.get(`${BASE_URL}/${crystalId}`)
    const query = new URLSearchParams({
        load: `owner=_ownerId:users`
    });
        const response = await axios.get(`${CRYSTAL_URL}/${crystalId}/details`,
        // const response = await axios.get(`${CRYSTAL_URL}/${crystalId}/details/?${query}`,
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
        );
  
        return response;
    // const result = await request.get(`${BASE_URL}/${crystalId}?${query}`);
}

export const create = async (userId, crystalData) => {

    const response = await axios.post(CREATE_URL,
        JSON.stringify({name: crystalData.name, color: crystalData.color, appearance: crystalData.appearance, rarity: crystalData.rarity, source: crystalData.source, healing: crystalData.healing, imageUrl: crystalData.imageUrl, owner: userId}),
        {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }
    );

    // const result = await request.post(BASE_URL, crystalData);

    return response;
}

export const edit = async (crystalId, crystalData) => {
    const response = await axios.put(`${CRYSTAL_URL}/${crystalId}/edit`, 
        JSON.stringify({_id: crystalId, name: crystalData.name, color: crystalData.color, appearance: crystalData.appearance, rarity: crystalData.rarity, source: crystalData.source, healing: crystalData.healing, imageUrl: crystalData.imageUrl}),
        {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }
    );
    // const result = await request.put(`${BASE_URL}/${crystalId}`, crystalData)

    return response;
}

// export const remove = async (crystalId) => await request.remove(`${BASE_URL}/${crystalId}`);
export const remove = async (crystalId) => {
    await axios.delete(`${CRYSTAL_URL}/${crystalId}`,
        {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
        }
    );
} 
    
export const getLatest = async () => {

    const response = await axios.get(HOME_URL,
        {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }
    );

    return response;
}
export const getByOwnerId = async (_ownerId) => {
    try {
        const query = new URLSearchParams({
            where: `_ownerId="${_ownerId}"`
        }).toString();

        const result = await request.get(`${BASE_URL}?${query}`);
        return result;
    } catch (error) {
        console.error('Error fetching crystals by owner ID:', error);
        throw error;
    }
};

export const searchByNameOrHealing = async (name, healing) => {
    let response;
    try {
        response = await axios.get(`${SEARCH_URL}?name=${name}&healing=${healing}`);
    } catch (error) {
        
        return error.message;
    }
    return response.data.crystals;
};