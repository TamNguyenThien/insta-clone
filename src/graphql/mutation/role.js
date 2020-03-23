import gql from 'graphql-tag'

const CREATE_ROLE = gql`
	mutation createRole($input: CreateRoleInput!) {
		createRole(input: $input) {
			_id
			code
			description
			permissions
		}
	}
`

const UPDATE_ROLE = gql`
	mutation updateRole($id: ID!, $input: UpdateRoleInput!) {
		updateRole(_id: $id, input: $input) {
			_id
			code
			description
			permissions
		}
	}
`

const DELETE_ROLE = gql`
	mutation deleteRole($id: ID!) {
		deleteRole(_id: $id)
	}
`
export {UPDATE_ROLE, DELETE_ROLE, CREATE_ROLE}
