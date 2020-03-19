import gql from 'graphql-tag'

const CREATE_ORDER_FOR_USER = gql`
  mutation createOrder ($input: UserOrderInput) {
    createOrder(input: $input){
    idMenu
    idDish
    idUser
  }
  }
`

export { CREATE_ORDER_FOR_USER }
