import gql from 'graphql-tag'

const GET_GREETING = gql`
	query getGreeting {
		hello
	}
`

export {GET_GREETING}
