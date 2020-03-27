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
			idShop
			dishes {
				_id
				name
				count
			}
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

const PUBLISH_MENU = gql`
	mutation publishMenu($name: String!) {
		publishMenu(name: $name) {
			_id
			name
			isPublished
		}
	}
`
const UNPUBLISH_MENU = gql`
	mutation unPublishMenu($name: String!) {
		unPublishMenu(name: $name) {
			_id
			name
			isPublished
		}
	}
`
export {GET_MENUS, GET_MENUS_BY_NODE, DISH_SHOP, PUBLISH_MENU, UNPUBLISH_MENU}
