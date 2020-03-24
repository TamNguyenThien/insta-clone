import gql from 'graphql-tag'

const GET_INFO_PROFILE = gql`
	query me {
		me {
			_id
			fullName
		}
	}
`

export {GET_INFO_PROFILE}
