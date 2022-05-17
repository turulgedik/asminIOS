import { STAFF, STAFF_FORMS, STAFF_FORMS_ADD, STAFF_FORMS_REMOVE, STAFF_FORMS_UPDATE, STAFF_POOLS, STAFF_POOLS_ADD, STAFF_POOLS_REMOVE, STAFF_POOLS_UPDATE, STAFF_UPDATE } from '../actions/types'


const initialState={
    staff:null,
    forms:[],
    pool:[]
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

    switch(action.type){
        case STAFF:
            return{
                ...state,
                staff:action.payload
            }
        case STAFF_UPDATE:
            /*
            const type=action.payload.type
            let copy={...state.staff}
            copy[type]=action.payload.value
            */
            return{
                ...state,
                staff:action.payload
            }

        case STAFF_FORMS:
            return {
                ...state,
                forms:action.payload
            }

        case STAFF_FORMS_ADD:
            return{
                ...state,
                forms:[...state.forms,action.payload]
            }
        
        case STAFF_FORMS_UPDATE:
            return {
                ...state,
                forms: update([...state.forms], action.payload),
            }

        case STAFF_FORMS_REMOVE:
            return {
                ...state,
                forms: [...state.forms.filter(item=>item.id!==action.payload)],
            }

        case STAFF_POOLS:
            return {
                ...state,
                pool:action.payload
            }

        case STAFF_POOLS_ADD:
            return{
                ...state,
                pool:[action.payload,...state.pool]
            }
        
        case STAFF_POOLS_UPDATE:
            return {
                ...state,
                pool: update([...state.pool], action.payload),
            }

        case STAFF_POOLS_REMOVE:
            return {
                ...state,
                pool: [...state.pool.filter(item=>item.id!==action.payload)],
            }

        default:
            return state
    }

}