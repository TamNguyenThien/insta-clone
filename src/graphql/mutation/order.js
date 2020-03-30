import gql from 'graphql-tag'

const CONFIRM_ORDER = gql`
	mutation confirmOrder($orderId: ID!) {
		confirmOrder(orderId: $orderId)
	}
`
const CREATE_ORDER = gql`
	mutation createOrder($input: UserOrderInput) {
		createOrder(input: $input) {
			_id
			idUser
			idMenu
			idDish
			note
			isConfirmed
		}
	}
`
const CANCEL_ORDER = gql`
	mutation cancelOrder($input: RemoveOrderInput) {
		cancelOrder(input: $input)
	}
`
export {CREATE_ORDER, CANCEL_ORDER, CONFIRM_ORDER}
