

import {  SERVER} from '../urls'
import { QCustomerStaff, QCards, QTypes, QCustomerStaffType, QWaitingForms, QFormsID, QOffice, QGifts, QStaff, QMyFollow, QTopStaffList, QHistoryForms, QSearchForm } from '../Query/fal'
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";



let client = new ApolloClient({
    uri: SERVER,
    cache: new InMemoryCache(),

});



let user_client = null

export async function loginGraphql(token,csrf){
    console.log('loginGraphql',csrf)
    client=new ApolloClient({
        uri: SERVER+'/',
        cache: new InMemoryCache(),
        headers:{
            'Authorization':`Token ${token}`,
            'X-CSRFToken':csrf
        }
    });
}

export async function logoutGraphql(){

    getCSRF((token)=>{
        csrfToken=token
    })

    client=new ApolloClient({
        uri: SERVER,
        cache: new InMemoryCache()
    });
    
}

export async function getStaff(type=null) {
    
    return await client.query({
        query:type===null?QCustomerStaff:QCustomerStaffType,
        variables:{
            code:type
        }
    })
    .then(res=>{
        return res.data
    })
    .catch((ex)=>console.log(ex))
}

export async function getStaffID(id) {
    
    return await client.query({
        query:QStaff,
        variables:{
            id:id
        }
    })
    .then(res=>{
        return res.data
    })
    .catch((ex)=>console.log(ex))
}

export async function getCards(code) {
    
    return await client.query({
        query:QCards,
        variables:{
            type:code
        }
    })
    .then(res=>{
        return res.data
    })
    .catch((ex)=>console.log(ex))
}

export async function getTypes() {
    
    return await client.query({
        query:QTypes,
    })
    .then(res=>{
        console.log('red',res.data)
        return res.data
    })
    .catch((ex)=>console.log(ex))
}

export async function getGifts() {
    if(client===null)
        return
    return await client.query({
        query:QGifts,
    })
    .then(res=>{
        console.log('red',res.data)
        return res.data
    })
    .catch((ex)=>console.log(ex))
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

export async function getHistoryForms(start,end) {

    if(client===null)
        return

    return await client.query({
        query:QHistoryForms,
        variables:{
            start,
            end
        }
    })
    .then(res=>{
        console.log('getHistoryForms',res.data)
        return res.data
    })
    .catch((ex)=>console.log(ex))
}

export async function getSearchList(search) {

    if(client===null)
        return

    return await client.query({
        query:QSearchForm,
        variables:{
            search
        }
    })
    .then(res=>{
        console.log('getSearchList',res.data)
        return res.data
    })
    .catch((ex)=>console.log(ex))
}

export async function getMyFollow() {

    if(client===null)
        return

    return await client.query({
        query:QMyFollow,
        variables:{code:'my'}
    })
    .then(res=>{
        console.log('getMyFollow',res.data)
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

export async function getOffice() {

    if(client===null)
        return

    return await client.query({
        query:QOffice,
    })
    .then(res=>{
        console.log('getOffice',res.data)
        return res.data
    })
    .catch((ex)=>console.log(ex))
}

export async function getTopList() {

    return await client.query({
        query:QTopStaffList,
    })
    .then(res=>{
        console.log('getTopList',res.data)
        return res.data
    })
    .catch((ex)=>console.log(ex))
}