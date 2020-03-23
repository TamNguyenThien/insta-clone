import gql from 'graphql-tag'

const GET_MENUS = gql`
	query {
		menus {
			_id
			name
			isPublished
			isActive
		}
	}
`

const GET_MENUS_BY_NODE = gql`
	query($idNode: String!) {
		menusByNode(idNode: $idNode) {
			_id
			name
			isPublished
			isActive
		}
	}
`

const DISH_SHOP = gql`
	query {
		dish_shop {
			_id
			name
			count
		}
	}
`

export {GET_MENUS, GET_MENUS_BY_NODE, DISH_SHOP}
