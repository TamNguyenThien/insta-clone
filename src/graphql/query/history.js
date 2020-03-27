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

export {HISTORY_ORDER_BY_USER}
