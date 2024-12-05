// const BASE_URL = 'http://localhost:3030'
// const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;


const Path = {
    Home: '/',
    Login: '/login',
    Register: '/register',
    Logout: 'logout',
    CrystalEdit: '/crystals/:crystalId/edit',
    CrystalDelete: '/crystals/:crystalId/delete',
    Crystals: '/crystals',
    CrystalsCreate: '/crystals/create',
    CrystalDetails: '/crystals/:crystalId/details',
    About: '/about',
    Contact: '/contact',
    Search: '/search',
    MyProfile: '/profile'
}

export default Path;