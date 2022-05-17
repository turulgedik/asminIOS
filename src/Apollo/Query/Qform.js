import { gql } from '@apollo/client'


export const QHoroscopes = gql`
query{
    horoscopes{
      id
      name
    }
  }
`
export const QSectors = gql`
query{
  sectors{
      id
      name
    }
  }
`