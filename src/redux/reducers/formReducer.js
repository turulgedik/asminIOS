import { FORM_TYPE,FORM_BDAY, FORM_COFFIE, FORM_GENDER, FORM_HOROSCOPE, FORM_INFO, FORM_LOVETYPE, FORM_NAME, FORM_PART_BDAY, FORM_PART_HOROSCOPE, FORM_PART_INFO, FORM_PART_MOMNAME, FORM_PART_NAME, FORM_SECTOR, FORM_SURNAME, FORM_TAROT, FORM_TAROT_REMOVE, FORM_STAFF, FORM_KATINA, FORM_KATINA_REMOVE, FORM_ISKAMBIL, FORM_ISKAMBIL_REMOVE, FORM_WATER, FORM_MOMNAME, FORM_ANSWER_TYPE, FORM_COIN, FORM_GIFT } from '../actions/types'
import Moment from 'moment'

const initialState={
    staff:null,
    name:'',
    surname:'',
    bDay:Moment(new Date()).format('YYYY-MM-DD'),
    horoscope:null,
    gender:null,
    loveType:null,
    sector:null,
    info:'',
    type:null,
    part_name:'',
    part_mom_name:'',
    part_bDay:Moment(new Date()).format('YYYY-MM-DD'),
    part_horoscope:null,
    part_info:'',
    coin:0,
    gift:null,
    answer_type:null,
    coffie:{
        image1:null,
        image2:null,
        image3:null,
        image4:null,
        image5:null
    },
    tarot:[],
    katina:[],
    iskambil:[],
    water:{
        pp:null,
        part_pp:null
    },
    mom_name:''
}

export default function(state=initialState,action){

    switch(action.type){
        case FORM_COIN:
            return{
                ...state,
                coin:action.payload
            }
        case FORM_STAFF:
            return{
                ...state,
                staff:action.payload
            }
        case FORM_NAME:
            return{
                ...state,
                name:action.payload
            }
        case FORM_SURNAME:
            return{
                ...state,
                surname:action.payload
            }
        case FORM_BDAY:
            return{
                ...state,
                bDay:action.payload
            }
        case FORM_HOROSCOPE:
            return{
                ...state,
                horoscope:action.payload
            }
        case FORM_GENDER:
            return{
                ...state,
                gender:action.payload
            }
        case FORM_LOVETYPE:
            return{
                ...state,
                loveType:action.payload
            }
        case FORM_GIFT:
            return{
                ...state,
                gift:action.payload
            }
        case FORM_SECTOR:
            return{
                ...state,
                sector:action.payload
            }
        case FORM_INFO:
            return{
                ...state,
                info:action.payload
            }
        case FORM_TYPE:
            console.log('action',action.payload)
            return{
                ...state,
                type:action.payload
            }
        case FORM_PART_NAME:
            return{
                ...state,
                part_name:action.payload
            }
        case FORM_PART_MOMNAME:
            return{
                ...state,
                part_mom_name:action.payload
            }
        case FORM_MOMNAME:
            return{
                ...state,
                mom_name:action.payload
            }
        case FORM_PART_BDAY:
            return{
                ...state,
                part_bDay:action.payload
            }
        case FORM_PART_HOROSCOPE:
            return{
                ...state,
                part_horoscope:action.payload
            }
        case FORM_PART_INFO:
            return{
                ...state,
                part_info:action.payload
            }
        case FORM_ANSWER_TYPE:
            return{
                ...state,
                answer_type:action.payload
            }
        case FORM_COFFIE:
            const type=action.payload.type
            let copy={...state.coffie}
            copy[type]=action.payload.image

            return{
                ...state,
                coffie:copy
            }
        case FORM_TAROT:
            return{
                ...state,
                tarot:[...state.tarot,action.payload]
            }
        
        case FORM_TAROT_REMOVE:
            return{
                ...state,
                tarot:[...state.tarot.filter(item=>item!==action.payload)]
            }

        case FORM_KATINA:
            return{
                ...state,
                katina:[...state.katina,action.payload]
            }
        
        case FORM_KATINA_REMOVE:
            return{
                ...state,
                katina:[...state.katina.filter(item=>item!==action.payload)]
            }

        case FORM_ISKAMBIL:
            return{
                ...state,
                iskambil:[...state.iskambil,action.payload]
            }
        
        case FORM_ISKAMBIL_REMOVE:
            return{
                ...state,
                iskambil:[...state.iskambil.filter(item=>item!==action.payload)]
            }

        case FORM_WATER:
            console.log('water',water_type)
            const water_type=action.payload.type
            let water_copy={...state.water}
            water_copy[water_type]=action.payload.image
            
            return{
                ...state,
                water:water_copy
            }

        default:
            return state
    }

}