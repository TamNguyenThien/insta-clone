import gql from 'graphql-tag'

const GET_ORDER_AND_MENU = gql`
	query {
		currentUserOrder {
			_id
			idDish
			idMenu
			isConfirmed
		}
		menuPublished {
			_id
			name
			dishes {
				_id
				name
				count
			}
		}
	}
`

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

export {GET_MENU_PUBLISHED_BY_NODE, GET_ORDER_AND_MENU}
