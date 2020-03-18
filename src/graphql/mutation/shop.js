import gql from 'graphql-tag'

const CREATE_SHOP = gql`
  mutation createShop($input: createShopInput!) {
    createShop(input: $input){
      _id
      name
    }
  }
`

const UPDATE_SHOP = gql`
  mutation updateShop($id: String!, $name: String!) {
    updateMenu(id: $id, name: $name) {
      _id
      name
    }
  }
`

const DELETE_SHOP = gql`
  mutation deleteShop($id: String!) {
    deleteShop(id: $id) {
      _id
      name
    }
  }
`

export {CREATE_SHOP, UPDATE_SHOP, DELETE_SHOP}

