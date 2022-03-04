import { PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers } from "@reduxjs/toolkit"
import { WritableDraft } from "immer/dist/internal"
import { RootState } from "./store"

export interface ResourceType<T extends { id: string }> {
    ids: string[],
    entities: Record<string, T>
}

export function add<T extends {id: string}>(state: ResourceType<T>, action: PayloadAction<T>){
    return{
        ...state,
        ids:[...new Set([...state.ids,action.payload.id as string])],
        entities:{
            ...state.entities,
            [action.payload.id]:action.payload
        }
    }
}

export function destroy<T>(state:WritableDraft<T>, action: PayloadAction<number>){

}

export function load<T>(state: WritableDraft<T>, action: PayloadAction<T[]>) {

}

export function update<T>(state: WritableDraft<T>, action: PayloadAction<T>) {

}

export default {
    add,destroy,load,update
}