import gql from 'graphql-tag'

const CHANGE_PASSWORD = gql`
	mutation($id: ID!, $currentpassword: String!, $newpassword: String!) {
		changePassword(
			_id: $id
			currentpassword: $currentpassword
			newpassword: $newpassword
		)
	}
`

export {CHANGE_PASSWORD}
