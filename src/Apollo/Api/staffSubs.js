import {  SERVER, SUB_SERVER} from '../urls'
import { QCustomerStaffSub, QWaitingFormsIDsub } from '../Query/fal'
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { QcreatePool, QMyStaffSub, QupdatePool } from '../Query/staff';


const wsLink = new WebSocketLink({
    uri: SERVER,
    options: {
      reconnect: true,
    }
  });

let client = null

export async function loginGraphql(token, csrf){
    client=new ApolloClient({
        link:new WebSocketLink({
            uri: SUB_SERVER+'/',
            options: {
              reconnect: true,
            }
          }),
        cache: new InMemoryCache(),
        headers:{
            'Authorization':`Token ${token}`,
            'X-CSRFToken':csrf
        }
    });
    
}


export async function subsStaff(id,updater=()=>{}) {

    if(client===null)
        return

    return await client.subscribe({
        query:QMyStaffSub,
        variables:{id}
    })
    .subscribe({
        next(data){
            updater(data)
        },
        error(err){
            console.log('subsCreatedRouteError',err)
        }
    })
}

export async function subsPoolCreate(updater=()=>{}) {

    if(client===null)
        return
    return await client.subscribe({
        query:QcreatePool,
    })
    .subscribe({
        next(data){
            updater(data)
        },
        error(err){
            console.log('subsPoolCreate',err)
        }
    })
}

export async function subsPoolUpdate(updater=()=>{}) {

    if(client===null)
        return
    return await client.subscribe({
        query:QupdatePool,
    })
    .subscribe({
        next(data){
            updater(data)
        },
        error(err){
            console.log('subsPoolUpdate',err)
        }
    })
}