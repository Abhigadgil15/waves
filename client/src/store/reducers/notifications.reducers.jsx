import { ERROR_GLOBAL,SUCCESS_GLOBAL,CLEAR_NOTIFICATIONS } from "../types"
export default function notificationsReducer(state={},action){
    switch(action.type){
            case ERROR_GLOBAL:
                return {...state,error:true,msg:action.payload}
            case SUCCESS_GLOBAL:
                return {...state,success:true,msg:action.payload} // we want the existing state of the user having id as MY_DOG
            case CLEAR_NOTIFICATIONS:
                return {} //since we want to clear all notis we go to default state of nothing
            default:
                return state
    }
}