import * as actions from './index';
import axios from "axios"
import { getAuthHeader ,removeTokenCookie,getTokenCookie} from '../../utils/tools';

axios.defaults.baseURL ='http://localhost:3001';
axios.defaults.headers.post['Content-Type']='application/json'
export const userRegister = (values) => {
    return async(dispatch)=>{
        try{
            const user = await axios.post(`/api/auth/register`,{
                email:values.email, 
                password:values.password
            });
            dispatch(actions.userAuthenticate({data: user.data.user,auth: true}))
            
            dispatch(actions.successGlobal('Welcome !! check you mail to verify account.'))
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))

        }
    }
}

export const userSignIn = (values) => {
    return async(dispatch)=>{
        try{
            const user = await axios.post(`/api/auth/signin`,{
                email:values.email, 
                password:values.password
            }, 
            {
                withCredentials: true // Ensure credentials are sent with the request
            });
            dispatch(actions.userAuthenticate({data: user.data.user,auth: true}))
            
            dispatch(actions.successGlobal('Welcome !!'))
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))

        }
    }
}

export const userisAuth = () =>{

    
    return async(dispatch) =>{
        try{
            if(!getTokenCookie()){
                throw new Error();
            }
            const user = await axios.get(`/api/auth/isauth`, getAuthHeader());
            
            console.log(user);
            dispatch(actions.userAuthenticate({data:user.data,auth:true}))
        }
        catch(error){
            dispatch(actions.userAuthenticate({data:{},auth:false}))
        }
    }

}

//we can also create a model to handle tokens in case the token is incorrect or the token is flagged or expired
export const userSignOut = () => {
    return async(dispatch)=> {
        removeTokenCookie();
        dispatch(actions.userSignOut())
        dispatch(actions.successGlobal('Good bye !!'))
        
    }
}

export const userUpdateProfile = (data) => {
    //getState is a cool feature in redux where the redux will temporarily store the input without rendering the component(i.e without user doing any operation on it) 
    return async(dispatch,getState)=>{
        try{
            const profile = await axios.patch('/api/users/profile',{
                data:data
            },getAuthHeader());

            const userData = {
                ...getState().users.data,
                firstname:profile.data.firstname,
                lastname:profile.data.lastname,
            }
            dispatch(actions.userUpdateProfile(userData));
            dispatch(actions.successGlobal("Data updated"))
        }
        catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const updateUserEmail = (data) => {
    console.log(data)
    return async(dispatch)=>{
        try{
            await axios.patch(`/api/users/email`,{
                email: data.email,
                newemail: data.newemail
            }, getAuthHeader());

            dispatch(actions.updateUserEmail(data.newemail))
            dispatch(actions.successGlobal('Good job, Remember to verify your account !!'))
        } catch(error){
            dispatch(actions.errorGlobal(error))
        }
    }
}  