import React, { useReducer, useMemo } from "react";
import { GeneralProps } from "../@shared/Models/Common";

export type ContextProviderValueType<T, U> = {
    state: T,
    dispatch: React.Dispatch<ContextProviderActionType<T,U>>
}

export type ContextProviderActionType<T,U> = {
    type: U,
    payload: Partial<T>
}

type ProviderType<T, U>  = {
    Context: React.Context<ContextProviderValueType<T, U> | null>,
    initialState: T | Function,
    reducer: (state: T, action: ContextProviderActionType<T,U>)=> T
}

export default function Provider<T, U>(props: GeneralProps<ProviderType<T, U>>){
    let initialState = props.initialState
    if (props.initialState instanceof Function)
    {
        initialState = props.initialState()
    }
    const [state, dispatch] = useReducer(props.reducer, initialState as T);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);
    
    return(
        <props.Context.Provider value={{state:  contextValue.state, dispatch: contextValue.dispatch}}>
            {props.children}
        </props.Context.Provider>
    )
}