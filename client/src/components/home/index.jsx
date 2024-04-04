import React from "react";
import Featured from './featured';
import Promotions from "../../utils/promotions/slim.block";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { productsBySort } from "../../store/actions/products.actions"


const slimPromotion = {
        img:'../../../public/images/featured/featured_home_3.jpg',
        lineOne:'Upto 40% off',
        lineTwo:'In second hand guitar',
        linkTitle:'Shop Now',
        linkTo:'/shop'
    }

const Home = () =>{


    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(productsBySort())
    },[dispatch])

// to retrieve from redux

    return(
        <div>
            <Featured/>
            <Promotions items={slimPromotion}/>
        </div>
    )
}

export default Home;