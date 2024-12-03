import React, { useEffect, useReducer } from 'react';
import { useDispatch,useSelector } from 'react-redux'
import DashBoardLayout from '../../../../hoc/dashBoardLayout';
import { ProductsByPagination, removeProduct } from '../../../../store/actions/products.actions';
import ProductsTable from './productstable';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const defaultvalues = { keywords:'',brand:[],min:0,max:5000,frets:[],page:1}
const Products = () =>{
    const navigate = useNavigate();


    const [removeModal,setRemoveModal] = useState(false);
    const [removeId,setRemoveId] = useState(null);

    const products = useSelector(state => state.products)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch();
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({...state,...newState }),
        defaultvalues
    )
    const goToPage = (page) =>{
        setSearchValues({page:page})
    }

    const goToEdit = (id) =>{
        navigate(`/dashboard/products/edit_product/${id}`);
}

const handleModal = (id) =>{
    setRemoveId(id);
    setRemoveModal(true);
}

const handleClose = () =>{
    setRemoveModal(false);
}

const handleRemove = () =>{
    dispatch(removeProduct(removeId));
}
useEffect(()=>{
    dispatch(ProductsByPagination(searchValues))
},[dispatch,searchValues])


useEffect(()=>{
    handleClose();
    setRemoveModal(null)
    if(notifications && notifications.removeProduct){
        dispatch(ProductsByPagination(searchValues))
    }

},[dispatch,notifications])

    return(
        <DashBoardLayout>
            <div className='products_table'>
                Search
            
            <hr/>
            <ProductsTable 
            removeModal ={removeModal}
            prods ={products.byPaginate}
            prev ={(page) => goToPage(page)}
            next ={(page) => goToPage(page)}
            edit ={(id) => goToEdit(id)}
            handleClose ={() => handleClose()}
            handleModal ={(id) => handleModal(id)}
            handleRemove ={() => handleRemove()}
            />
            </div>
        </DashBoardLayout>
    )
}
export default Products;