import axios from 'axios'
import { LOADING,LOADED,FORM_BDAY, FORM_COFFIE, FORM_GENDER, FORM_HOROSCOPE, FORM_INFO, FORM_LOVETYPE, FORM_NAME, FORM_PART_BDAY, FORM_PART_HOROSCOPE, FORM_PART_INFO, FORM_PART_MOMNAME, FORM_PART_NAME, FORM_SECTOR, FORM_SURNAME } from '../actions/types'
import { MAIN_URL, tokenConfig } from './host'

export const falAction = (type, data) => dispatch => {
    dispatch({
        type: type,
        payload: data
    })
}


export const create = (data,result=()=>{}) => (dispatch, getState) => {
    dispatch({ type: LOADING })
    let headers=tokenConfig(getState).headers
    headers['Accept']='application/json'
    headers['Content-Type']='multipart/form-data'
    console.log('header',headers)
    fetch(MAIN_URL+'/fal/api/', {
        method: 'POST',
        headers:headers,
        body: data
    })
        .then((res) => res.json())
        .then((json) => {
            result(json)
            dispatch({ type: LOADED })
        })
        .catch((ex) => {
            console.log('ex', ex)
            dispatch({ type: LOADED })
        })

}

export const createComment = (data,result=()=>{}) => (dispatch, getState) => {


    axios.post(MAIN_URL+'/comments/comment/',data,tokenConfig(getState))
    .then((res)=>{
        result(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })

}

export const createRate = (data,result=()=>{}) => (dispatch, getState) => {


    axios.post(MAIN_URL+'/comments/rate/',data,tokenConfig(getState))
    .then((res)=>{
        result(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })

}

export const createGift = (data,result=()=>{}) => (dispatch, getState) => {


    axios.post(MAIN_URL+'/gift/',data,tokenConfig(getState))
    .then((res)=>{
        result(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })

}

export const createMessage = (data,result=()=>{}) => (dispatch, getState) => {

    let headers=tokenConfig(getState).headers
    headers['Accept']='application/json'

    fetch(MAIN_URL+'/fal/message/', {
        method: 'POST',
        headers:headers,
        body: data
    })
        .then((res) => res.json())
        .then((json) => {
            result(json)
        })
        .catch((ex) => console.log('ex', ex))

}

export const getPaymentReport = (data,result=()=>{}) => (dispatch, getState) => {


    axios.post(MAIN_URL+'/payments/priceReport/',data,tokenConfig(getState))
    .then((res)=>{
        result(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })

}

export const getPaymentBonus = (result=()=>{}) => (dispatch, getState) => {


    axios.get(MAIN_URL+'/payments/bonus/',tokenConfig(getState))
    .then((res)=>{
        result(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })

}