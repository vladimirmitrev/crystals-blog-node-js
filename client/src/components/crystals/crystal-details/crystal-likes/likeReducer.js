const reducer = (state, action) => {
    switch (action?.type) {
        case 'GET_ALL_LIKES':
            return [...action.payload];
        case 'ADD_LIKE':
            return [...state, action.payload];
        case 'REMOVE_LIKE':
            return [...state, action.payload];
        case 'EDIT_LIKE':
            return state.map(like => like._id === action.payload._id ? { ...like, isLiked: action.payload.isLiked } : like)
        default:
            return state;
    }
};

export default reducer;