import React,{useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '../utils/tools';
import { useDispatch,useSelector } from "react-redux";
import { clear_notifications } from '../store/actions/index';
const MainLayout = (props) =>{
    const notifications = useSelector(state =>state.notifications)
    const dispatch = useDispatch();
    useEffect(()=>{
        if(notifications && notifications.error){
            const msg = notifications.msg ? notifications.msg : 'Error';
            showToast('ERROR',msg)
            dispatch(clear_notifications());
        }
        if(notifications && notifications.success){
            const msg = notifications.msg ? notifications.msg : 'Success';
            showToast('SUCCESS',msg)
            dispatch(clear_notifications());
        }
    },[notifications,dispatch])



    return (
    <div>
        {props.children}
        <ToastContainer/>
    </div>
    )
}

export default MainLayout;

// import React, { useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify'; // Import toast from react-toastify
// import 'react-toastify/dist/ReactToastify.css';
// import { showToast } from '../utils/tools'; // Check the import path here

// const MainLayout = (props) => {
//     useEffect(() => {
//         showToast('SUCCESS', 'Some error'); // Ensure case matches 'SUCCESS'
//     });

//     return (
//         <div>
//             {props.children}
//             <ToastContainer /> {/* Render ToastContainer component here */}
//         </div>
//     );
// };

// export default MainLayout;