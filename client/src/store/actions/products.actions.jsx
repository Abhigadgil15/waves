import axios from "axios"
import * as actions from './index';
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
        dispatch(actions.successGlobal('Sorry someething happened try again'))
    }
}
}