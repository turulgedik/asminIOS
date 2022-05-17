import {combineReducers} from 'redux'

import UserReducer from './userReducer'
import FormReducer from './formReducer'
import FalReducer from './falReducer'
import RecordReducer from './recorderReducer'
import StaffReducer from './staffReducer'
import AppReducer from './AppReducer'

export default combineReducers({
    User:UserReducer,
    Form:FormReducer,
    Fal:FalReducer,
    Record:RecordReducer,
    Staff:StaffReducer,
    App:AppReducer,
})