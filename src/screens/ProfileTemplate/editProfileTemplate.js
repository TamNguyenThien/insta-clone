import React from 'react'
import {View} from 'react-native'
import {useMutation} from '@apollo/react-hooks'

import {PROFILETEMPLATE} from '../../constants'
import {UPDATE_PROFILE_TEMPLATE} from '../../graphql'
import ProfileTemplateForm from './profileTemplateForm'

export default function EditProfileTemplateScreen({navigation, route}) {
	const [updateProfileTemplate] = useMutation(UPDATE_PROFILE_TEMPLATE)
	const {item, refetchProfileTemplate} = route.params

	const handleSubmit = (values, role, node) => {
		const {name} = values
		console.log(item)

		updateProfileTemplate({
			variables: {
				id: item._id,
				input: {
					name: name,
					idRole: role,
					idNode: node
				}
			}
		})
			.then(res => {
				if (res.errors) {
					console.log({title: 'Update profile template failed!'})
				} else {
					refetchProfileTemplate()
					console.log({title: 'Update profile template success'})
					navigation.navigate(PROFILETEMPLATE)
				}
			})
			.catch(err => {
				console.log(err)
				console.log({title: 'Update profile template failed!!!!'})
			})
	}

	return (
		<View>
			<ProfileTemplateForm
				title="EDIT"
				handleSubmit={handleSubmit}
				handleCancel={() => navigation.navigate(PROFILETEMPLATE)}
				item={{name: item.name, role: item.idRole, node: item.idNode}}
			/>
		</View>
	)
}
