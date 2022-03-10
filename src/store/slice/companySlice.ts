import genericStore from "../genericStore";

type CompanyEntity = {
    id: string
    companyName: string,
    city: string
}

const companySlice = genericStore.createResourceSlice<CompanyEntity>('company');

export const companyAction  = companySlice.actions

export default companySlice.reducer