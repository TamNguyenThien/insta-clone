import gql from 'graphql-tag'

const CREATE_DISH = gql`
  mutation createDish($name: String!, $idShop: ID!) {
    createDish(name: $name, idShop: $idShop) {
      name
      _id
    }
  }
`

const UPDATE_DISH = gql`
  mutation updateShop($id: ID!, $name: String!) {
    updateDish(id: $id, name: $name) {
      name
      _id
    }
  }
`

const DELETE_DISHES = gql`
  mutation deleteDishes($ids: [ID!]) {
    deleteDishes(ids: $ids)
  }
`

export {CREATE_DISH, UPDATE_DISH, DELETE_DISHES}