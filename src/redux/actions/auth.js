import axios from 'axios'
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, LOADING, LOADED, ACCOUNT_UPDATE, CSRF, APP_STATUS } from './types'
import { MAIN_URL, tokenConfig } from './host'


export const getCSRF = () => dispatch => {
  axios.get(MAIN_URL+'/api/csrf/')
  .then(res=>{
    dispatch({
      type: CSRF,
      payload: res.data.csrf
    })
  })
}

export const getAppStatus = () => dispatch => {
  axios.get(MAIN_URL+'/api/getAppStatus/')
  .then(res=>{
    dispatch({
      type: APP_STATUS,
      payload: res.data.status
    })
  })
}

export const loadUser = (token) => (dispatch,getState) => {
  dispatch({ type: LOADING })
  
  let config = tokenConfig(getState)
  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }

  console.log('auth',config)

  axios.get(MAIN_URL + '/api/user/',config)
    .then(res => {
      const widthToken = { user: { ...res.data }, token: token }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: widthToken
      })
      dispatch({ type: LOADED })
      console.log('loadUser', res.data)
    })
    .catch(err => {
      console.log("Login Error", err);
      dispatch({
        type: AUTH_ERROR,
      })
      dispatch({ type: LOADED })
    })

}

export const login = (u, p, result = () => { }) => dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  dispatch({ type: LOADING })
  const body = JSON.stringify({ username: u, password: p })
  axios.post(MAIN_URL + '/api/login/', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })

      dispatch({ type: LOADED })
      result(true)
    })
    .catch(err => {
      console.log(err)
      result(false)
      dispatch({ type: LOADED })
      dispatch({
        type: LOGIN_FAIL,
      })
    })

}

export const updatePushToken = (token) => (dispatch, getState) => {
  axios.post(MAIN_URL + '/api/updateToken/', {
    token
  }, tokenConfig(getState))
    .then(res => {
      console.log(res.data)

    })
    .catch(err => {
      console.log(err)

    })

}

export const followTo = (id,result=()=>{}) => (dispatch, getState) => {
  axios.post(MAIN_URL + '/api/follow/', {
    to:id
  }, tokenConfig(getState))
    .then(res => {
      console.log(res.data)
      result(res.data)
    })
    .catch(err => {
      console.log(err)

    })

}

export const register = (data, request) => dispatch => {

  dispatch({ type: LOADING })
  console.log('data', data)
  const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  fetch(MAIN_URL + '/api/register/', {
    method: 'POST',
    body: data,
  })
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: json
      })
      console.log('res', json)
      dispatch({ type: LOADED })
      request(true)
    })
    .catch((error) => {
      dispatch({ type: LOGIN_FAIL })
      dispatch({ type: LOADED })
      console.log('hataqq', error)
      request(false)
    })

}

export const logOut = () => (dispatch, getState) => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const token = getState().User.auth.token

  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }

  axios.post(MAIN_URL + '/rest-auth/logout/', null, config)
    .then(res => {
      dispatch({
        type: LOGOUT,
      })
    })
}



export const updateAccount = (data,result = () => { }) => (dispatch, getState) => {
  dispatch({ type: LOADING })
  let headers=tokenConfig(getState).headers
  headers['Accept']='application/json'
  headers['Content-Type']='multipart/form-data'

  fetch(MAIN_URL + '/api/accountUpdate/', {
    method: 'POST',
    body: data,
    headers:headers,
  })
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: ACCOUNT_UPDATE,
        payload: json
      })
      console.log('res', json)
      dispatch({ type: LOADED })
      result(json)
    })
    .catch((error) => {
      console.log('hataqq', error)
      result(false)
    })
}