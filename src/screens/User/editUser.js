import React, {useState} from 'react'
import {TouchableWithoutFeedback, Keyboard} from 'react-native'
import {useMutation} from '@apollo/react-hooks'

import {UPDATE_USER} from '../../graphql'
import {USER_DETAIL} from '../../constants'
import UserForm from './userForm'

export default function EditUser({navigation, route}) {
	const {item, refetchUsers} = route.params
	const [updateUser] = useMutation(UPDATE_USER)

	const handleUpdate = values => {
		const {password, fullName} = values
		console.log(item._id, password, fullName)
		updateUser({
			variables: {
				id: item._id,
				input: {
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
						title: 'Update user success'
					})
					navigation.navigate(USER_DETAIL, {item: {...item, fullName}})
				}
			})
			.catch(error => {
				console.log(error)
				console.log({
					title: 'Update user failed!'
				})
			})
	}

	const handleCancel = () => {
		navigation.navigate(USER)
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<UserForm
				title="EDIT"
				handleSubmit={handleUpdate}
				handleCancel={handleCancel}
				isEditForm={true}
				item={{
					username: item.username,
					fullName: item.fullName,
					password: '',
					confirmPassword: ''
				}}
			/>
		</TouchableWithoutFeedback>
	)
}
