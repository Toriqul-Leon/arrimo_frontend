import { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  users: [],
  display: "users",
};

export const GlobalContext = createContext(initialState);

export default function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    state.display = localStorage.getItem("display");
  }, []);

  function addUser(user) {
    dispatch({
      type: "ADD_USER",
      payload: user,
    });
  }

  function deleteUser(id) {
    dispatch({
      type: "DELETE_USER",
      payload: id,
    });
  }

  function addUsers(users) {
    dispatch({
      type: "ADD_USERS",
      payload: users,
    });
  }

  function editUser(user, id) {
    dispatch({
      type: "EDIT_USER",
      payload: user,
      id,
    });
  }

  function toggleDisplay(display) {
    dispatch({
      type: "TOGGLE_DISPLAY",
      payload: display,
    });
  }

  const value = {
    users: state.users,
    display: state.display,
    deleteUser,
    addUser,
    addUsers,
    editUser,
    toggleDisplay,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
