import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '../utils/tools';
import { useDispatch, useSelector } from "react-redux";
import { clear_notifications } from '../store/actions/index';

const MainLayout = (props) => {
    const notifications = useSelector(state => state.notifications);
    const dispatch = useDispatch();
    const [notificationsCleared, setNotificationsCleared] = useState(false);

    useEffect(() => {
        if (!notificationsCleared && (notifications.error || notifications.success)) {
            const type = notifications.error ? 'ERROR' : 'SUCCESS';
            const msg = notifications.msg ? notifications.msg : type === 'ERROR' ? 'Error' : 'Success';
            showToast(type, msg);
            dispatch(clear_notifications());
            setNotificationsCleared(true);
        }
    }, [notifications, notificationsCleared, dispatch]);

    return (
        <div>
            {props.children}
            <ToastContainer />
        </div>
    );
}

export default MainLayout;