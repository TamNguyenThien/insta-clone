import gql from 'graphql-tag'

const DISHES_BY_SHOP = gql`
  query dishesByShop($idShop: ID!) {
    dishesByShop(idShop: $idShop) {
      name
      _id
    }
  }
`

export {DISHES_BY_SHOP}