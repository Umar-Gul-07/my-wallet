import { createContext, useReducer } from "react";
import { ContactInfo } from "./Data";

export const Store = createContext();

const initialState = {
  UserInfo: localStorage.getItem("UserInfo")
  ? JSON.parse(localStorage.getItem("UserInfo"))
  : null,

  Admin: localStorage.getItem("Admin")
    ? JSON.parse(localStorage.getItem("Admin"))
    : null,
  ContactInfo: localStorage.getItem("ContactInfo")
    ? JSON.parse(localStorage.getItem("ContactInfo"))
    : ContactInfo,
};

function reducer(state, action) {
  switch (action.type) {
    case "LawyerLogin":
      localStorage.setItem("UserInfo", JSON.stringify(action.payload));
     return { ...state, UserInfo: action.payload };

     case "LawyerLogout":
       localStorage.removeItem("UserInfo");
      localStorage.removeItem("Project");
      return { ...state, UserInfo: null, Project: null };
      
    case "ClearUserInfo":
      return { ...state, UserInfo: null };
    case "Admin":
      localStorage.setItem("Admin", JSON.stringify(action.payload));
      return { ...state, Admin: action.payload };
    case "AdminLogout":
      localStorage.removeItem("Admin");
      return { ...state, Admin: null };
    case "UserLoggedIn":
      return { ...state, UserInfo: action.payload };
    case "update":
      return { UserInfo: action.payload };
    case "ResetUserInfo":
      return { ...state, UserInfo: null };
    default:
      return state;
  }
}

// Utility functions for authentication
export const isAuthenticated = () => {
  const admin = localStorage.getItem("Admin");
  return admin ? JSON.parse(admin) : null;
};

export const loginAdmin = (adminData) => {
  localStorage.setItem("Admin", JSON.stringify(adminData));
  return adminData;
};

export const logoutAdmin = () => {
  localStorage.removeItem("Admin");
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}> {props.children} </Store.Provider>;
}
