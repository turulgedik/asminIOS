import { func } from 'prop-types'
import {AUTH_ERROR,USER_LOADED,USER_LOADING, LOGIN_FAIL,LOGIN_SUCCESS, LOGOUT, ACCOUNT_UPDATE, GIFT_COUNT_UPDATE, FAL_COUNT_UPDATE, COIN_UPDATE, CSRF} from '../actions/types'
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token
    } catch (err) {
      console.log(err);
      return null
    }
};

const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (err) {
      console.log(err);
    }
};

const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch (err) {
        console.log(err);
    }
};


const initialState={
    auth:{
        token:null,
        isAuth:false,
        isLoading:false
    },
    user:null,
    csrf:null
}

export default function(state=initialState,action){

    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                auth:{...state.auth,isLoading:true}
            }
        case USER_LOADED:
            return{
                ...state,
                auth:{...state.auth,isLoading:false,isAuth:true,token:action.payload.token},
                user:action.payload.user!==undefined?action.payload.user:action.payload
            }

        case ACCOUNT_UPDATE:
            return{
                ...state,
                user:action.payload.user
            }
        case GIFT_COUNT_UPDATE:
            return{
                ...state,
                user:{...state.user,gift_count:action.payload}
            }
        case FAL_COUNT_UPDATE:
            return{
                ...state,
                user:{...state.user,fal_count:action.payload}
            }
        case COIN_UPDATE:
            return{
                ...state,
                user:{...state.user,coin:action.payload}
            }
        case CSRF:
            return{
                ...state,
                csrf:action.payload
            }
        case LOGIN_SUCCESS:
            saveToken(action.payload.token)
            return {
                ...state,
                auth:{token:action.payload.token,isAuth:true,isLoading:false},
                user:action.payload.user
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            removeToken()
            return{
                ...state,
                auth:{token:null,isAuth:false,isLoading:false},
                user:null
            }
        default:
            return state
    }

}