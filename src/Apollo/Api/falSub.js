import {  SERVER, SUB_SERVER} from '../urls'
import { QCustomerStaffSub, QOfficeSub, QWaitingFormsIDsub } from '../Query/fal'
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { QcreatePool } from '../Query/staff';
import {getCSRF} from '../../redux/actions/auth'


const wsLink = new WebSocketLink({
    uri: SERVER,
    options: {
      reconnect: true,
    }
  });

let client = null

export async function loginGraphql(token,csrf){
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


export async function subsStaff(updater=()=>{}) {

    if(client===null)
        return

    return await client.subscribe({
        query:QCustomerStaffSub,
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

export async function subsFormID(id,updater=()=>{}) {

    if(client===null)
        return

    return await client.subscribe({
        query:QWaitingFormsIDsub,
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

export async function subsOffice(updater=()=>{}) {

    if(client===null)
        return

    return await client.subscribe({
        query:QOfficeSub,
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

