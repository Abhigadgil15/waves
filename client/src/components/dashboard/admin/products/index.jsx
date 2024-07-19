import React, { useEffect, useReducer } from 'react';
import { useDispatch,useSelector } from 'react-redux'
import DashBoardLayout from '../../../../hoc/dashBoardLayout';
import { ProductsByPagination} from '../../../../store/actions/products.actions';
import ProductsTable from './productstable';

const defaultvalues = { keywords:'',brand:[],min:0,max:5000,frets:[],page:1}
const Products = () =>{
    const products = useSelector(state => state.products)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch();
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({...state,...newState }),
        defaultvalues
    )
useEffect(()=>{
    dispatch(ProductsByPagination(searchValues))
},[dispatch,searchValues])


    return(
        <DashBoardLayout>
            <div className='products_table'>
                Search
            </div>
            <hr/>
            <ProductsTable prods ={products.byPaginate}/>
        </DashBoardLayout>
    )
}
export default Products;