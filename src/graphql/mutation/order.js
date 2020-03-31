import gql from 'graphql-tag'

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

const CONFIRM_ORDER = gql`
    mutation confirmOrder($orderId: ID!) {
    	confirmOrder(orderId: $orderId)
    }
`

const IS_ACTIVE_CONFIRM_ORDER = gql`
  query isActiveConfirmOrder {
    isActiveConfirmOrder
  }
`

export {CREATE_ORDER, CANCEL_ORDER, CONFIRM_ORDER, IS_ACTIVE_CONFIRM_ORDER}
