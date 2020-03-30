import gql from 'graphql-tag'

const CREATE_MENU = gql`
	mutation createMenu($input: CreateMenuInput!) {
		createMenu(input: $input) {
			_id
			name
			isActive
		}
	}
`

const UPDATE_MENU = gql`
	mutation updateMenu($id: String!, $name: String!) {
		updateMenu(id: $id, name: $name) {
			_id
			name
		}
	}
`

const DELETE_MENU = gql`
	mutation deleteMenu($id: String!) {
		deleteMenu(id: $id)
	}
`

const UPDATE_MENU_IS_SAVE = gql`
	mutation updateMenuIsSaved($input: [DishInfoSave], $menuId: ID!, $shopId: ID!, $nodeId: ID!) {
		updateMenuIsSaved(input: $input, menuId: $menuId, shopId: $shopId, nodeId: $nodeId)
	}
`
export {CREATE_MENU, UPDATE_MENU, DELETE_MENU, UPDATE_MENU_IS_SAVE}
