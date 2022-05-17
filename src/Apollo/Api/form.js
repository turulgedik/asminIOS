import {  SERVER} from '../urls'
import { QHoroscopes, QSectors } from '../Query/Qform'
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: SERVER,
    cache: new InMemoryCache()
});

export async function getHoroscopes() {
    
    return await client.query({
        query:QHoroscopes,
    })
    .then(res=>{
        return res.data
    })
    .catch((ex)=>console.log(ex))
}

export async function getSectors() {
    
    return await client.query({
        query:QSectors,
    })
    .then(res=>{
        return res.data
    })
    .catch((ex)=>console.log(ex))
}