import DashBoardLayout from '../../hoc/dashBoardLayout';
import React from 'react';

const UserDashBoard = ({users}) => { 
    return(
        <DashBoardLayout title="Overview">
            <div className='user_nfo_panel'>
                <div>
                    <span>{users.data.firstname}</span>
                    <span>{users.data.lastname}</span>
                    <span>{users.data.email}</span>
                </div>
                {
                    users.data.history ?
                    <div className='user_nfo_panel'>
                        <h1>History of purchases</h1>
                        <div className='user_product_block_wrapper'>
                            history
                        </div>
                    </div>
                    :null
                }
        </div> 
        </DashBoardLayout>
        
    )
}
export default UserDashBoard;