import React, { createContext, useContext, useEffect, useReducer } from "react";
const AppCon = createContext();
const ins = {
  isAddMode: true,
  EditUser: null,
  logged: false,
};

const reducer = (s = ins, { type, payload }) => {
  switch (type) {
    case "setEditMode":
      return {
        ...s,
        isAddMode: false,
        EditUser: payload,
      };
    case "login":
      return {
        ...s, logged: true
      }
    case "logout":
      return {
        ...s, logged: false
      }
  }
};

function AppProvider({ children }) {
  const [data, dispatch] = useReducer(reducer, ins);
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      dispatch({type: 'login'})
    }
  }, [])
  return (
    <AppCon.Provider value={{ data, dispatch }}>{children}</AppCon.Provider>
  );
}

export default AppProvider;
export const useContextData = () => {
  return useContext(AppCon);
};
