import genericStore from "../genericStore";

type OrderEntity = {
    id: string
    amount: number,
    itemNumber: number,
}

const orderSlice = genericStore.createResourceSlice<OrderEntity>('user');

export const orderAction  = orderSlice.actions

export default orderSlice.reducer