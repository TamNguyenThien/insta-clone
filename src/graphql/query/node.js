import gql from 'graphql-tag'

const GET_NODES = gql`
	query {
		nodes {
			_id
			name
			category
		}
	}
`

export { GET_NODES }
