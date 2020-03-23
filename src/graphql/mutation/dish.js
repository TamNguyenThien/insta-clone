import gql from 'graphql-tag'

const CREATE_DISH = gql`
  mutation createDishAndSaveDish($name: String!, $idShop: ID!) {
    createDishAndSaveDish(name: $name, idShop: $idShop) {
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

const DELETE_DISH = gql`
  mutation deleteDish($id: ID!, $name: String!) {
    deleteDish(id: $id, name: $name)
  }
`

export {CREATE_DISH, UPDATE_DISH, DELETE_DISH}