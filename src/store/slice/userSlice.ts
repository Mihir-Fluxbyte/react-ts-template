import { CaseReducer, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import genericAction, {ResourceType } from "../genericAction";
import { RootState } from "../store";
// import 
// import {}

type UserEntity = {
    id: string
    name: string,
    email: string
}

type UserState = ResourceType<UserEntity>

const initialState: UserState = {
    ids:[],
    entities:{}
}
// <UserState, SliceCaseReducers<UserState>, string>
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        add: (state, payload) => genericAction.add<UserEntity>(state, payload),
        destroy: genericAction.destroy,
        update: genericAction.update,
        load: genericAction.load
    }
})

export const userAction  = userSlice.actions

export default userSlice.reducer