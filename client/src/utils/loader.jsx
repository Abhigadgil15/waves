import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loaders = ({full}) =>{
    return(
    <div className={`root_loader ${full ? 'full':''}`}>
        <CircularProgress />
    </div>
    )
}
export default Loaders;