import gql from 'graphql-tag'

const GET_USERS = gql`
	query users {
		users {
			_id
			fullName
			username
			idAccount
			createdAt
			updatedAt
			isLocked
			reason
			numberOfTimesLocked
		}
	}
`

const ME = gql`
	query me {
		me {
			_id
			fullName
		}
	}
`
export {GET_USERS, ME}
