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

export {GET_ORDER_AND_MENU}
