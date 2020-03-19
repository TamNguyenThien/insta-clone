import gql from 'graphql-tag'

const SHOPS = gql`
  query {
    shops {
      _id
      name
    }
  }
`

export {SHOPS}