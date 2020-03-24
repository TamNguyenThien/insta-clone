import React from 'react'
import {View} from 'react-native'
import {useMutation} from '@apollo/react-hooks'

import {PROFILETEMPLATE} from '../../constants'
import {CREATE_PROFILE_TEMPLATE} from '../../graphql'
import ProfileTemplateForm from './profileTemplateForm'

export default function AddProfileTemplateScreen({navigation, route}) {
	const [createProfileTemplate] = useMutation(CREATE_PROFILE_TEMPLATE)
	const {refetchProfileTemplate} = route.params

	const handleSubmit = (values, role, node) => {
		const {name} = values
		console.log({name, role, node})
		createProfileTemplate({
			variables: {
				input: {
					name: name,
					idRole: role,
					idNode: node
				}
			}
		})
			.then(res => {
				if (res.errors) {
					console.log({title: 'Create profile template failed!'})
				} else {
					refetchProfileTemplate()
					console.log({title: 'Create profile template success'})
					navigation.navigate(PROFILETEMPLATE)
				}
			})
			.catch(err => {
				console.log(err)
				console.log({title: 'Create profile template failed!!!!'})
			})
	}

	return (
		<View>
			<ProfileTemplateForm
				title="CREATE"
				handleSubmit={handleSubmit}
				handleCancel={() => navigation.navigate(PROFILETEMPLATE)}
				item={{name: '', role: '', node: ''}}
			/>
		</View>
	)
}
