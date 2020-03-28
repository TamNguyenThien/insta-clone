import gql from 'graphql-tag'

const HISTORY_ORDER_BY_USER = gql`
	query orderByUser($startDate: Float!, $endDate: Float!) {
		orderByUser(startDate: $startDate, endDate: $endDate) {
			_id
			fullName
			orders {
				_id
				createdAt
			}
		}
	}
`

const HISTORY_GET_LOCK_MENUS = gql`
	query getLockMenus($by: ByLockMenu, $variables: VariablesLockMenu) {
		getLockMenus(by: $by, variables: $variables) {
			_id
			name
			dishes {
				_id
				name
				count
			}
			isPublished
			isLocked
			isActive
			createdAt
			updatedAt
		}
	}
`

const HISTORY_GET_ORDERS = gql`
	query getOrders($by: ByOrder, $variables: VariablesOrder) {
		getOrders(by: $by, variables: $variables) {
			_id
			idUser
			idDish
			note
			isConfirmed
			createdAt
		}
	}
`

export {HISTORY_ORDER_BY_USER, HISTORY_GET_LOCK_MENUS, HISTORY_GET_ORDERS}
