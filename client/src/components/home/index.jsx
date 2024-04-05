import React from "react";
import Featured from './featured';
import Promotions from "../../utils/promotions/slim.block";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { productsBySort} from "../../store/actions/products.actions"
import CardBlock from "../../utils/products/card.blocks";
import Loaders from '../../utils/loader'
const slimPromotion = {
        img:'../../../public/images/featured/featured_home_3.jpg',
        lineOne:'Upto 40% off',
        lineTwo:'In second hand guitar',
        linkTitle:'Shop Now',
        linkTo:'/shop'
    }

const Home = () =>{
    const { bySold,byDate } = useSelector(state=>state.products)

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(productsBySort({
            limit:4,
            sortBy:'itemSold',
            order:'desc',
            where:'bySold'

    }));

    dispatch(productsBySort({
        limit:4,
        sortBy:'date',
        order:'desc',
        where:'byDate'

}));

    },[dispatch])

// console.log(bySold)

// console.log(byDate)

// to retrieve from redux

    return(
        <div>
            <Featured/>
            {bySold ?
            <CardBlock
                items={bySold}
                title='Best Selling guitars'
            /> : <Loaders/>}
            <Promotions items={slimPromotion}/>
            {byDate ?
            <CardBlock
                items={byDate}
                title='Latest guitars on shop'
            /> : <Loaders/>}
        </div>
    )
}

export default Home;