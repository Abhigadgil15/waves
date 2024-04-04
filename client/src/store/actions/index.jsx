
import { GET_PROD_BY_SOLD } from "../types"

export const productsBySold = (data) =>({
    type:GET_PROD_BY_SOLD,
    payload:data
})