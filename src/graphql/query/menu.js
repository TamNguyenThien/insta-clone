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

export {GET_MENUS, GET_MENUS_BY_NODE}
