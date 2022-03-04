import { createContext } from "react";
import { ContextProviderValueType, ContextProviderActionType } from "./Provider";


type AppContextType = {
    isAuthenticated: Boolean,
    token: string | null,
    user: string | null
}
type ActionOptionType = 'LOGIN'|'LOGOUT'
type ActionType = ContextProviderActionType<AppContextType , ActionOptionType>;
type ContextProviderType = ContextProviderValueType<AppContextType, ActionOptionType> | null

export default createContext<ContextProviderType>(null)

export const initialAuthState = (): AppContextType =>  {
    return {
        isAuthenticated: Boolean(localStorage.getItem('token')),
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user')
    }
}

export const authReducer  = (state: AppContextType, action: ActionType) =>{
    switch (action.type){
        case "LOGIN":
            localStorage.setItem('user',action.payload?.user ?? '')
            localStorage.setItem('token',action.payload?.token ?? '')
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload.user === undefined ? state.user : action.payload.user,
                token: action.payload.token === undefined ? state.token : action.payload.token
            }
        case "LOGOUT":
            localStorage.clear()
            return initialAuthState();

        default:
            return state;
    }
}