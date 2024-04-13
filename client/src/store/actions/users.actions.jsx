import * as actions from './index';
import axios from "axios"

axios.defaults.baseURL ='http://localhost:3001';
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