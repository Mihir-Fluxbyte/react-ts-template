import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResourceType } from "../genericAction";
import { RootState } from "../store";

type companyEntity = {
    id: string
    name: string,
    email: string
}

type CompanyState = ResourceType<companyEntity>

const initialState: CompanyState = {
    ids:[],
    entities:{}
}

const companySlice = createSlice({
    name:'company',
    initialState,
    reducers:{
        add(state,action){

        }
    }
})

export const companyAction  = companySlice.actions

export default companySlice.reducer