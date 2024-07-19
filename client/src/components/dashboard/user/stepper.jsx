import React, { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../utils/loader';
import { errorHelper } from '../../../utils/tools';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel
} from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import { updateUserEmail } from '../../../store/actions/users.actions';

const EmailStepper = ({users}) => {
    const [loading, setLoading] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    // const [show, setShow] = useState(false);
    const notifications = useSelector(state=> state.notifications);
    const dispatch = useDispatch();
    const [activeState,setactiveState] = useState(0);
    const steps = ['Enter old email','Enter new email','Please confirm your email']

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: { email:'', newemail:''},
        validationSchema:Yup.object({
            email:Yup.string()
            .required('This is required')
            .email('This is not a valid email')
            .test('match','Please check your email',(email)=>{
                return email === users.data.email
            }),
            newemail:Yup.string()
            .required('This is required')
            .email('This is not a valid email')
            .test('match','Please check your email',(newemail)=>{
                return newemail !== users.data.email
            })
        }),
        onSubmit:(values)=>{
            setLoading(true);
            dispatch(updateUserEmail(values));
            
        }
    });


    const closeModal = () => setEmailModal(false);
    const openModal = () => setEmailModal(true)
    const handleNext = () => {
        setactiveState((prevState)=> prevState + 1)
    }
    const handleBack= () => {
        setactiveState((prevState)=> prevState - 1)
    }
    const nextBtn = () => (
        <Button className="mt-3" variant="contained" color="primary" onClick={handleNext}>
            Next
        </Button>
    )


    const backBtn = () => (
        <Button className="mt-3 ml-2" variant="contained" onClick={handleBack}>
            Back
        </Button>
    )

    useEffect(()=>{
        if( notifications && notifications.success){
            closeModal();
        }
        setLoading(false);
    },[notifications])


    return(
        <>
            <form className="mt-3 article_form" style={{maxWidth:'250px'}}>
                <div className="form-group">
                <TextField
                        style={{ width:'100%'}}
                        name="emailstatic"
                        variant="outlined"
                        value={users.data.email}
                        disabled
                    />

                </div>
                <Button
                    className="mb-3"
                    variant="contained"
                    color="primary"
                    onClick={openModal}
                >
                    Edit email
                </Button>
            </form>
            
            <Modal size="lg" centered show={emailModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update your email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="mt-3 stepper_form" onSubmit={formik.handleSubmit}>
                    <Stepper activeStep={activeState}>
                        {
                            steps.map((step,index) =>{
                                return(
                                    <Step key={step}>
                                        <StepLabel>{step}</StepLabel>
                                    </Step>
                                )
                            })
                        }
                    </Stepper>
                    {
                        activeState === 0 ?
                        <div className='form-group'>
                            <TextField
                                style={{width:'100%'}}
                                name="email"
                                variant="outlined"
                                label="Enter your old email"
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik,'email')}  />
                                {
                                    formik.values.email && !formik.errors.email ?
                                    nextBtn()
                                    :null
                                }
                        </div> :null
                    }
                    {
                        activeState === 1 ?
                        <div className='form-group'>
                            <TextField
                                style={{width:'100%'}}
                                name="newemail"
                                variant="outlined"
                                label="Enter your new email"
                                {...formik.getFieldProps('newemail')}
                                {...errorHelper(formik,'newemail')}  />
                                {
                                    formik.values.newemail && !formik.errors.newemail ?
                                    nextBtn()
                                    :null
                                }{
                                backBtn()
                            }
                        </div> :null
                    }
                    { activeState === 2 ?
                        <div className="form-group">
                            { loading ?
                                <Loader/>
                                :
                                <>
                                    <Button
                                        className="mt-3"
                                        variant="contained"
                                        color="primary"
                                        onClick={formik.submitForm}
                                    >
                                        Edit email
                                    </Button>
                                    {backBtn()}
                                </>
                            }
                        </div>
                    :null}
                    </form>
                </Modal.Body>
            </Modal>

        </>
    )
    
}

export default EmailStepper;