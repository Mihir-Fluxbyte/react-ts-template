import genericStore from "../genericStore";

type UserEntity = {
    id: string
    name: string,
    email: string,
    companyId: string
}

const userSlice = genericStore.createResourceSlice<UserEntity>('user');

export const userAction  = userSlice.actions

export default userSlice.reducer