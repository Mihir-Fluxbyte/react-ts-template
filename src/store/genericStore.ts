import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WritableDraft } from "immer/dist/internal"


export type GenericEntity<E> = E & {id: string}

export type GenericPartialEntity<E> = Partial<E> & {id: string}

export type ResourceType<T> = {
    ids: Array<String>, // string []
    entities: Record<string, GenericEntity<T>> // {[key: string]: GenericEntity<T>}
}

export function add<E, R extends ResourceType<E>>(state: WritableDraft<R>, action: PayloadAction<GenericEntity<E>>){
    return{
        ...state,
        ids:[...new Set([...state.ids,action.payload.id as string])],
        entities:{
            ...state.entities,
            [action.payload.id]:action.payload
        }
    }
}

export function update<E, R extends ResourceType<E>>(state: WritableDraft<R>, action: PayloadAction<GenericPartialEntity<E>>){
    return{
        ...state,
        ids:[...new Set([...state.ids,action.payload.id as string])],
        entities:{
            ...state.entities,
            [action.payload.id]:{
                ...state.entities[action.payload.id],
                ...action.payload
            }
        }
    }
}

export function destroy<E, R extends ResourceType<E>>(state:WritableDraft<R>, action: PayloadAction<{id: string}>){
    const newId = state.ids.filter(i=> i!==action.payload.id);
    const { [action.payload.id]: _removedEntity, ...filteredEntities } = state.entities; 
    return {
        ...state,
        ids : newId,
        entities: filteredEntities
    }
}

export function load<E, R extends ResourceType<E>>(state: WritableDraft<R>, action: PayloadAction<GenericEntity<E>[]>) {
    return{
        ...state,
        ids: [...new Set([...(state.ids), ...action.payload.map(item => item.id)])],
        entities:{
            ...state.entities,
            ...action.payload.reduce((p, c) => ({ ...p, [c.id as KeyType]: c }), {})
        },
    }
}

export function createResourceSlice<E>(name:string){
    const initialState: ResourceType<E> = {
        ids:[],
        entities:{}
    }
    return createSlice({
        name,
        initialState,
        reducers: {
            add(state: WritableDraft<ResourceType<E>>, action: PayloadAction<GenericEntity<E>>) {
                return add<E, ResourceType<E>>(state, action);
            },
            update(state: WritableDraft<ResourceType<E>>, action: PayloadAction<GenericPartialEntity<E>>){
                return update<E, ResourceType<E>>(state, action);
            },
            destroy(state: WritableDraft<ResourceType<E>>, action: PayloadAction<{id: string}>){
                return destroy<E, ResourceType<E>>(state, action);
            },
            load(state: WritableDraft<ResourceType<E>>, action: PayloadAction<GenericEntity<E>[]>) {
                return load<E, ResourceType<E>>(state, action);
            }
        }
    })
}

export default {
    add,destroy,load,update, createResourceSlice
}