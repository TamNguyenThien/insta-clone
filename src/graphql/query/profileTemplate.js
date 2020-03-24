import gql from 'graphql-tag'

const GET_PROFILE_TEMPLATES = gql`
	query profileTemplates {
		profileTemplates {
			_id
			idRole
			idNode
			name
			createdAt
			updatedAt
		}
	}
`

export {GET_PROFILE_TEMPLATES}
