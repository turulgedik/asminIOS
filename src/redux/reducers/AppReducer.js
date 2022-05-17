import {LOADED,LOADING,APP_STATUS} from '../actions/types'

const initialState={
    loading:false,
    status:false
}

export default function(state=initialState,action){

    switch(action.type){
        case LOADING:
            return{
                ...state,
                loading:true,
            }
        case LOADED:
            return{
                ...state,
                loading:false,
            }
        case APP_STATUS:
            return{
                ...state,
                status:action.payload,
            }
        default:
            return state
    }

}