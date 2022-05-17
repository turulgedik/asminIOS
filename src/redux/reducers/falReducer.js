import { FAL_NEW, FAL_WAITING, FAL_WAITING_ADD, FAL_WAITING_UPDATE,AUTH_ERROR,LOGIN_FAIL,LOGOUT } from "../actions/types";



const initialState={

    newForm:null,
    waiting:[],
    history:[],


}

const update = (oldArray, updated) => {
    let copy = oldArray
    console.log('oldArray', oldArray)
    const index = oldArray.findIndex(item => item.id === updated.id)
    console.log('index',index)
    if (index > -1) {

        copy.splice(index, 1, updated)
    }

    return copy

}

export default function(state=initialState,action){

    switch (action.type) {
        case FAL_WAITING:
            
            return{
                ...state,
                waiting:action.payload
            }

        case FAL_WAITING_ADD:
            return {
                ...state,
                waiting: [...state.waiting, action.payload]
            }

        case FAL_WAITING_UPDATE:
            return {
                ...state,
                waiting: update([...state.waiting], action.payload),
            }

        case FAL_NEW:
            
            return{
                ...state,
                newForm:action.payload
            }
        
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            return{
                ...initialState
            }

        default:
            return state
    }

}