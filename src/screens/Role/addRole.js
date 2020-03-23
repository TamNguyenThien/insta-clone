import React from 'react'
import {View} from 'react-native'
import {useMutation} from '@apollo/react-hooks'

import {ROLE} from '../../constants'
import RoleForm from './roleForm'
import {CREATE_ROLE} from '../../graphql'

export default function AddRoleScreen({navigation, route}) {
	const [createRole] = useMutation(CREATE_ROLE)
	const {refetchRoles} = route.params

	const handleSubmit = (values, permissions) => {
		const {code, description} = values
		console.log({code, description, permissions})
		createRole({
			variables: {
				input: {
					code,
					description,
					permissions
				}
			}
		})
			.then(res => {
				if (res.errors) {
					console.log({title: 'Create role failed!'})
				} else {
					refetchRoles()
					console.log({title: 'Create role success'})
					navigation.navigate(ROLE)
				}
			})
			.catch(err => {
				console.log(err)
				console.log({title: 'Create role failed!'})
			})
	}

	return (
		<View>
			<RoleForm
				title="CREATE"
				handleSubmit={handleSubmit}
				handleCancel={() => navigation.navigate(ROLE)}
				item={{code: '', description: '', permissions: []}}
			/>
		</View>
	)
}
