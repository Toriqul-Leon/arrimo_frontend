export default function AppReducer(state, action) {
    switch (action.type) {
        case 'ADD_USERS':
            return {
                ...state,
                users: action.payload
            }

        case 'ADD_USER':
            return {
                ...state,
                users: [...state.users, action.payload]
            }

        case 'DELETE_USER':
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            }

        case 'EDIT_USER':

            return {
                ...state,
                users: state.users.map(user => user._id === action.id ? action.payload : user)
            }

        default:
            return state;

        }
}