import { createContext } from "react";
import { ContextProviderValueType, ContextProviderActionType } from "./Provider";

type LoadingContextType = {
    isLoading: Boolean,
    counter: number
}
type ActionOptionType = '+'|'-'
type ActionType = ContextProviderActionType<LoadingContextType , ActionOptionType>;
type ContextProviderType = ContextProviderValueType<LoadingContextType, ActionOptionType> | null

export default createContext<ContextProviderType>(null);

export const initialLoadingState =():LoadingContextType => {
    return {
        isLoading: false,
        counter: 0,
    }
};

export const loadingReducer = (state:LoadingContextType, action:ActionType) => {
  switch (action.type) {
    case "+":
      return {
        isLoading: true,
        counter: state.counter + 1,
      };
    case "-":
      return {
        isLoading: state.counter !== 1,
        counter: Math.max(state.counter - 1),
      };
    default:
      return state;
  }
};