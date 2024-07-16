import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const links = [
    {
        name:'My account',
        linkTo:'/dashboard'
    },
    {
        name:'User Information',
        linkTo:'/dashboard/user/user_info'
    },
    {
        name:'User cart',
        linkTo:'/dashboard/user/user_cart'
    },
];
export const admin = [
    {
        name:'Products',
        linkTo:'/dashboard/admin/admin_products'
    },
    {
        name:'Manage sites',
        linkTo:'/dashboard/admin/manage_sites'
    },
]
const DashBoardLayout  = (props) => { 
    const users = useSelector(state => state.users);
    const generate_links = (data) =>(
        data.map((item,i) =>(
            <Link to={item.linkTo} key = {`${item.name}${i}`}>
                {item.name}
            </Link>
        ))
    )
    return(

        <div className='container'>
            <div className='user_container page_container'>
                <div className='user_left_nav'>
                    <h2>My account</h2>
                    <div className='links'>
                        {generate_links(links)}
                    </div>
                    {
                        users.data.role == 'admin' ?
                        <div>
                            <h2>Admin</h2>
                            <div className='links'>
                                {generate_links(admin)}
                            </div>
                            </div>:null
                        
                    }
                </div>
                <div className='user_right'>
                    <div className='dashboard_title'>
                        <h1>{props.title}</h1>
                    </div>
                    {props.children}
                </div>
                
            </div>
        </div>
    )
}
export default DashBoardLayout;
