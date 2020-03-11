import gql from 'graphql-tag'

const USER_LOGIN = gql`
	mutation login($input: LoginUserInput!) {
		login(input: $input) {
			accessToken
		}
	}
`

export {USER_LOGIN}
