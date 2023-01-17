import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';


const initialState = {
    users: [],
}

export const GlobalContext = createContext(initialState);


export default function GlobalContextProvider({ children }) {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function addUser(user) {
        dispatch({
            type: 'ADD_USER',
            payload: user
        })
    }

    function deleteUser(id) {
        dispatch({
            type: 'DELETE_USER',
            payload: id
        })
    }

    function addUsers(users) {
        dispatch({
            type: 'ADD_USERS',
            payload: users
        })
    }

    function editUser(user, id) {
        dispatch({
            type: 'EDIT_USER',
            payload: user, 
            id
        })
    }

    const value = {
        users: state.users,
        deleteUser,
        addUser,
        addUsers,
        editUser
    }
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}