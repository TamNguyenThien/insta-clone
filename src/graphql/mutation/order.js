import gql from 'graphql-tag'

const CONFIRM_ORDER = gql`
	mutation confirmOrder($orderId: ID!) {
		confirmOrder(orderId: $orderId)
	}
`
export {CONFIRM_ORDER}
