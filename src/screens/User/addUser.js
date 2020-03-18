import React, {useState} from 'react'
import {TouchableWithoutFeedback, Keyboard} from 'react-native'
import {useMutation} from '@apollo/react-hooks'

import {CREATE_USER} from '../../graphql'
import {USER} from '../../constants'
import UserForm from './userForm'

export default function AddUserScreen({navigation, route}) {
	const [createUser] = useMutation(CREATE_USER)
	const {refetchUsers} = route.params

	const handleAdd = values => {
		const {username, password, fullName} = values
		createUser({
			variables: {
				input: {
					username,
					password,
					fullName
				}
			}
		})
			.then(res => {
				if (res.errors) {
					console.log({
						title: 'Create user failed!'
					})
				} else {
					refetchUsers()
					console.log({
						title: 'Create user success'
					})
					navigation.navigate(USER)
				}
			})
			.catch(err => {
				console.log({
					title: 'Create user failed!'
				})
			})
	}

	const handleCancel = () => {
		navigation.navigate(USER)
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<UserForm
				title="CREATE"
				handleSubmit={handleAdd}
				handleCancel={handleCancel}
				isEditForm={false}
				item={{username: '', fullName: '', password: '', confirmPassword: ''}}
			/>
		</TouchableWithoutFeedback>
	)
}
