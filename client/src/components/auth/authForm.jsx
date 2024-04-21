import React,{useState,useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loaders from'../../utils/loader'
import {useDispatch,useSelector} from 'react-redux';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {errorHelper} from'../../utils/tools'
import { userRegister,userSignIn } from '../../store/actions/users.actions';

const AuthForm = (props) =>{
    const navigate = useNavigate();
    const notifications = useSelector(state=>state.notifications)
    const [loading,setLoading] = useState(false);
    const dispatch =useDispatch();

    const formik = useFormik({
        initialValues:{ email:'francis@gmail.com',password:'testing123' },
        validationSchema:Yup.object({
            email:Yup.string()
            .required('Sorry the email is required')
            .email('This is an invalid email'),
            password:Yup.string()
            .required('Sorry the password is required')
        }),
        onSubmit:( values)=>{
            setLoading(true);
            handleSubmit(values)
        }
    })
    const handleSubmit = (values) => {

        if(props.formType){
            dispatch(userRegister(values))
        } else {
            ///// sign in
            dispatch(userSignIn(values))
        }

    }
    useEffect(()=>{
        if(notifications && notifications.success)
            navigate('/dashboard')
        else
            setLoading(false);
    },[notifications])





    return (
        <div style={{ marginTop: '20px' }}>
            <div className='auth_container'>
                {loading ?
                <Loaders/>
            :
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                    
            <div className="form-group">
                <TextField
                    style={{width:'100%'}}
                    name="email"
                    label="Enter your email"
                    variant="outlined"  
                    {...formik.getFieldProps('email')}
                    {...errorHelper(formik,'email')}

                />
            </div>
            <div className="form-group" style={{ marginTop: '10px' }}>
                <TextField
                    style={{width:'100%'}}
                    name="password"
                    label="Enter your password"
                    variant="outlined"  
                    type="password"
                    {...formik.getFieldProps('password')}
                    {...errorHelper(formik,'password')}
                />
            </div>
            <div style={{ marginTop: '10px' }}>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                size="small"
            >
                { props.formType ? 'Register':'Login'}
            </Button>
            </div>

        </form>
            }
            </div>
        </div>
    )
}
export default AuthForm;