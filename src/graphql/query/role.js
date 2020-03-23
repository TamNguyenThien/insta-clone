import gql from 'graphql-tag'

const GET_ROLES = gql`
	query {
		roles {
			_id
			code
			description
			permissions
			isActive
			createdAt
			updatedAt
		}
	}
`

export {GET_ROLES}
