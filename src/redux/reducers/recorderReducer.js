import { RECORD_SET, RECORD_PERMISSION, RECORD_PLAY, RECORD_RESET } from "../actions/types";



const initialState={

    recording:null,
    maxDuration:600000,
    permission:true,
    play:false
}


export default function(state=initialState,action){

    switch (action.type) {
        case RECORD_SET:
            
            return{
                ...state,
                recording:action.payload
            }

        case RECORD_PERMISSION:
            return {
                ...state,
                permission: action.payload
            }

        case RECORD_PLAY:
            return {
                ...state,
                play: action.payload,
            }
        
        case RECORD_RESET:
            return initialState

        default:
            return state
    }

}