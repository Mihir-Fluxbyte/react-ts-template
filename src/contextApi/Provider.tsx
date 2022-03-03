import React, { useReducer, useMemo } from "react";
import { GeneralProps } from "../@shared/Models/Common";

export type ContextProviderValueType<T> = {
    state: T,
    disptach: React.Dispatch<ContextProviderActionType<T>>
}

export type ContextProviderActionType<T> = {
    type: string,
    payload?: Partial<T>
}

type ProviderType<T>  = {
    Context: React.Context<ContextProviderValueType<T> | null>,
    initialState: T,
    reducer: (State: T, Action: ContextProviderActionType<T>)=> T
}

export default function Provider<T>(props: ProviderType<T> & GeneralProps){
    const [state, dispatch] = useReducer(props.reducer, props.initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);
    
    return(
        <props.Context.Provider value={{state:  contextValue.state, disptach: contextValue.dispatch}}>
            {props.children}
        </props.Context.Provider>
    )
}