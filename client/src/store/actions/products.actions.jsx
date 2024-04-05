import axios from "axios"
import * as actions from './index';
// import { config } from 'dotenv';
// config()
axios.defaults.baseURL ='http://localhost:3001';
//async functions dont return an object but we need async function to fetch the data. thats why we need thunk that acts as a middleware 
export const productsBySort = () =>{
    return async(dispatch)=>{
    try{
        const products = await axios.get(`/api/products/all`, {
            params: {
                limit: 2,
                sortBy: 'price',
                order: 'asc'
            }
        });
        console.log(products.data)
        dispatch(actions.productsBySold(products.data));
    } catch(error){
        console.log(error)
    }
}
}