import axios from 'axios'
import { MAIN_URL, tokenConfig } from './host'



export const getPackets = (result=()=>{}) => dispatch => {
  
    axios.get(MAIN_URL + '/packets/')
      .then(res => {
            console.log('packets')
            result(res.data)
      })
      .catch(err => {
        console.log("packet", err);

      })
  
  }

  export const create = (data,result=()=>{}) => (dispatch, getState) => {

    let headers=tokenConfig(getState).headers
    headers['Accept']='application/json'
    headers['Content-Type']='multipart/form-data'
    console.log('header',headers)
    fetch(MAIN_URL+'/sale/', {
        method: 'POST',
        headers:headers,
        body: data
    })
        .then((res) => res.json())
        .then((json) => {
            result(json)
        })
        .catch((ex) => {
            console.log('ex', ex)
        })

}