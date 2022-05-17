

import {  SERVER} from '../urls'
import { QMyStaff, QPools } from '../Query/staff'
import {QWaitingForms,QFormsID} from '../Query/fal'
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

let client = null

export async function loginGraphql(token, csrf){
    console.log('token',token)
    if(client)
        return

    client=new ApolloClient({
        uri: SERVER+'/',
        cache: new InMemoryCache(),
        headers:{
            'Authorization':`Token ${token}`,
            'X-CSRFToken':csrf
        }
    });
    
}

export async function getMyStaff() {
    console.log('client',client)
    return await client.query({
        query:QMyStaff,
    })
    .then(res=>{
        return res.data
    })
    .catch((ex)=>console.log('myStaff',ex))
}

export async function getMyWaitingForms() {

    if(client===null)
        return

    return await client.query({
        query:QWaitingForms,
    })
    .then(res=>{
        console.log('getMyWaitingForms',res.data)
        return res.data
    })
    .catch((ex)=>console.log(ex))
}

export async function getForm(id) {

    if(client===null)
        return

    return await client.query({
        query:QFormsID,
        variables:{id}
    })
    .then(res=>{
        console.log('getForm',res.data)
        return res.data
    })
    .catch((ex)=>console.log(ex))
}

export async function getPools() {

    if(client===null)
        return

    return await client.query({
        query:QPools,
    })
    .then(res=>{
        console.log('getPools',res.data)
        return res.data
    })
    .catch((ex)=>console.log(ex))
}