import gql from 'graphql-tag'

const CREATE_PROFILE_TEMPLATE = gql`
	mutation createProfileTemplate($input: CreateProfileTemplateInput!) {
		createProfileTemplate(input: $input) {
			_id
			idRole
			idNode
			name
			createdAt
			updatedAt
		}
	}
`
const UPDATE_PROFILE_TEMPLATE = gql`
	mutation updateProfileTemplate(
		$id: ID!
		$input: UpdateProfileTemplateInput!
	) {
		updateProfileTemplate(_id: $id, input: $input) {
			_id
			idRole
			idNode
			name
			createdAt
			updatedAt
		}
	}
`
const DELETE_PROFILE_TEMPLATE = gql`
	mutation deleteProfileTemplate($id: ID!) {
		deleteProfileTemplate(_id: $id)
	}
`

export {
	CREATE_PROFILE_TEMPLATE,
	UPDATE_PROFILE_TEMPLATE,
	DELETE_PROFILE_TEMPLATE
}
