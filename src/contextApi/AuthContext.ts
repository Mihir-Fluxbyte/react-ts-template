import { createContext } from "react";
import { ContextProviderValueType, ContextProviderActionType } from "./Provider";


type AppContextInterface = {
    isAuthenticated: Boolean,
    token: string | null,
    user: string | null
}

interface ActionType extends ContextProviderActionType<AppContextInterface>{
    type: 'LOGIN'|'LOGOUT',
}

export default createContext<ContextProviderValueType<AppContextInterface> | null>(null)

export const initialAuthState = (): AppContextInterface =>  {
    return {
        isAuthenticated: Boolean(localStorage.getItem('token')),
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user')
    }
}

export const authReducer  = (state: AppContextInterface, action: ActionType) =>{
    switch (action.type){
        case "LOGIN":
            localStorage.setItem('user',action.payload?.user ?? '')
            localStorage.setItem('token',action.payload?.token ?? '')
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload?.user,
                token: action.payload?.token
            }
        case "LOGOUT":
            localStorage.clear()
            return initialAuthState();

        default:
            return state;
    }
}