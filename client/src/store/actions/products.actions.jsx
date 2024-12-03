import axios from "axios"
import * as actions from './index';
import { getAuthHeader } from "@/utils/tools";
// import { config } from 'dotenv';
// config()
axios.defaults.baseURL ='http://localhost:3001';
//async functions dont return an object but we need async function to fetch the data. thats why we need thunk that acts as a middleware 
export const productsBySort = ({limit,sortBy,order,where}) =>{
    return async(dispatch)=>{
    try{
        const products = await axios.get(`/api/products/all`, {
            params: {
                limit,
                sortBy,
                order
        }});
        switch(where){
            case 'bySold':
                dispatch(actions.productsBySold(products.data))
            break;
            case 'byDate':
                dispatch(actions.productsByDate(products.data))
            break;
            default:
                return false;
        }
    } catch(error){
        dispatch(actions.errorGlobal('Sorry something happened try again'))
    }
}
}

export const ProductsByPagination = (args) =>{
    return async(dispatch) => {
        try{
            const products = await axios.post('/api/products/paginate/all',args)
            dispatch(actions.productsByPagination(products.data))
            // dispatch(actions.successGlobal('Products listed successfully'));
        }
        catch(error){
            dispatch(actions.errorGlobal('Sorry something happened try again'))
        }
    }
}

export const removeProduct = (id) =>{
    return async(dispatch) => {
        try{
            const products = await axios.delete( `/api/products/product/${id}`,getAuthHeader())
            // dispatch(actions.productsByPagination(products.data))
            dispatch(actions.removeProduct());
            dispatch(actions.successGlobal('Products deleted successfully'));
        }
        catch(error){
            dispatch(actions.errorGlobal('Sorry something happened try again'))
        }
    }
}