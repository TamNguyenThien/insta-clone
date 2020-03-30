import gql from 'graphql-tag'

const GET_MENU_PUBLISHED_BY_NODE = gql`
  query menuPublishedByNode($idNode: String!) {
    menuPublishedByNode(idNode: $idNode) {
      _id
      name
      idNode
      idShop
      isPublished
      dishes{
        _id
        count
        name
      }
    }
  }
`

const CURRENT_USER_ORDER = gql`
  query currentUserOrder {
    currentUserOrder {
      _id
      idUser
      idDish
      isConfirmed
    }
  }
`

export {GET_MENU_PUBLISHED_BY_NODE, CURRENT_USER_ORDER}