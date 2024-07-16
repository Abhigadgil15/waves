import React,{useState} from 'react';
import Button from '@mui/material/Button';
import AuthForm from './authForm';
import * as Yup from 'yup';
import PreventSignInROute from '../../hoc/preventSignInROute';
const RegisterLogin = (props) => {
    const [formType,setFormType] = useState(false);

    const toogleFormType = ()=>{
        setFormType(!formType)
    }
    return(
        <PreventSignInROute>
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        { formType ?
                            <>
                                <h1>New customers</h1>
                                <p>Welcome to waves! You need to register to purchase our products. Once you are registered. Check your email for verifying your account. </p>
                            </>
                            :
                            <>
                                <h1>Welcome back!</h1>
                                <p>Welcome to waves! Check out our new batch of cort guitars! Special sales for halloween!</p>
                            </>
                        }

                        <Button
                            variant="contained"
                            size="small"
                            onClick={ ()=> toogleFormType() }
                        >
                            { formType ? "Already registered ?" : "Need to register" }
                        </Button>

                    </div>
                    <div className="right">
                        <h2>{formType ? 'Register':'Sign in'}</h2>
                        <AuthForm
                            formType={formType}
                            {...props}
                        />
                    </div>
                </div>
            </div>
        </div>
        </PreventSignInROute>
    )
}
export default RegisterLogin;