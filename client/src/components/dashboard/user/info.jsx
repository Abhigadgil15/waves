import React from 'react';
import DashBoardLayout from '../../../hoc/dashBoardLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from '../../../utils/tools';
import { useDispatch } from 'react-redux';
import { TextField,Button } from '@mui/material';
import { userUpdateProfile } from '../../../store/actions/users.actions';
import EmailStepper from './stepper';
const UserInfo = ({users}) =>{
const dispatch = useDispatch();

const formik = useFormik({
    enableReinitialize:true,
    initialValues:{
        firstname: users.data.firstname,
        lastname:users.data.lastname,
    },
    validationSchema:Yup.object({
        firstname:Yup.string()
        .min(3,'3 char min')
        .max(30,'30 char max')
        .required('Sorry, you need the first name'),
        lastname:Yup.string()
            .min(3,'3 char min')
            .max(30,'30 char max')
            .required('Sorry you need the lastname'),
    }),
    onSubmit:(values) =>{
        dispatch(userUpdateProfile(values))
    }
})

    return(
        <DashBoardLayout title = "User Information">
            <form className='mt-3 article_form' style={{maxWidith:'250px'}}
            onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                    <TextField
                    style={{width:'100%'}}
                    name="firstname"
                    variant="outlined"
                    label="Enter your first name"
                    {...formik.getFieldProps('firstname')}
                    {...errorHelper(formik,'firstname')}  />

                </div>
                <div className='form-group'>
                    <TextField
                    style={{width:'100%'}}
                    name="lastname"
                    variant="outlined"
                    label="Enter your last name"
                    {...formik.getFieldProps('lastname')}
                    {...errorHelper(formik,'lastname')}  />

                </div>
                <Button
                className='mb-3'
                variant="contained"
                color="primary"
                type="submit">
                    Edit profile

                </Button>
            </form>
            <hr/>
            <div>
                <EmailStepper users={users}/>
            </div>
            
        </DashBoardLayout>
    )

}
export default UserInfo;