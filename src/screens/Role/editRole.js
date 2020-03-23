import React from 'react'
import {View} from 'react-native'
import {useMutation} from '@apollo/react-hooks'

import {ROLE} from '../../constants'
import RoleForm from './roleForm'
import {UPDATE_ROLE} from '../../graphql'

export default function AddRoleScreen({navigation, route}) {
	const {item, refetchRoles} = route.params
	const [updateRole] = useMutation(UPDATE_ROLE)

	const handleSubmit = (values, permissions) => {
		const {code, description} = values
		console.log({code, description, permissions})
		updateRole({
			variables: {
				id: item._id,
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
                    console.log({title: 'Update role success'})
                    navigation.navigate(ROLE)
				}
			})
			.catch(error => {
				console.log(error)
				console.log({title: 'Update role failed!'})
			})
	}

	return (
		<View>
			<RoleForm
				title="EDIT"
				handleSubmit={handleSubmit}
				handleCancel={() => navigation.navigate(ROLE)}
				item={item}
			/>
		</View>
	)
}
