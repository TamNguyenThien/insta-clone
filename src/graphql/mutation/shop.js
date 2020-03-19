import gql from 'graphql-tag'

const CREATE_SHOP = gql`
  mutation createShop($input: CreateShopInput!) {
    createShop(shopName: $input){
      _id
      name
    }
  }
`

const UPDATE_SHOP = gql`
  mutation updateShop($_id: ID!, $name: String!) {
    updateShop(_id: $_id, name: $name) {
      _id
      name
    }
  }
`

const DELETE_SHOP = gql`
  mutation deleteShop($_id: ID!) {
    deleteShop(_id: $_id) {
      _id
      name
    }
  }
`

export {CREATE_SHOP, UPDATE_SHOP, DELETE_SHOP}

