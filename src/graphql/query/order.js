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

export {GET_MENU_PUBLISHED_BY_NODE}