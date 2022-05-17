import axios from 'axios'
import {  } from '../actions/types'
import { MAIN_URL, tokenConfig } from './host'

export const setStatus = (variable,value) => (dispatch, getState) => {
    let headers=tokenConfig(getState).headers
    headers['Accept']='application/json'
    headers['Content-Type']='multipart/form-data'

    let data =new FormData()
    data.append('variable',variable)
    data.append('value',value)

    fetch(MAIN_URL+'/fal/staffstatus/',{
        method:'POST',
        headers,
        body:data
    })

}

export const addOffice = (way,result = () => { }) => (dispatch, getState) => {
    let headers=tokenConfig(getState).headers
    headers['Accept']='application/json'
    headers['Content-Type']='multipart/form-data'

    let data =new FormData()
    data.append('way',way)

    fetch(MAIN_URL+'/fal/addOffice/',{
        method:'POST',
        headers,
        body:data
    })
    .then((res) => res.json())
    .then((json) => {
        result(json)
        console.log('jsno',json)
    })
    .catch((ex) => {
        console.log('ex', ex)
        alert(ex)
    })

}