import React, {useLayoutEffect, useState} from 'react'
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	Modal,
	TextInput,
	Button,
	ScrollView
} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {useMutation} from '@apollo/react-hooks'
import {Formik} from 'formik'
import * as yup from 'yup'

import {EDIT_USER, DELETE_USER} from '../../constants'
import {LOCK_UNLOCK_USER} from '../../graphql'

const reviewSchema = yup.object({
	reason: yup.string().required('Reason is required')
})

export default function UserDetailScreen({navigation, route}) {
	const {item, refetchUsers} = route.params
	const [lockUnlockUser] = useMutation(LOCK_UNLOCK_USER)
	const [user, setUser] = useState(item)
	const [modal, setModal] = useState(false)

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity
						style={{marginRight: 15}}
						onPress={() =>
							user.isLocked ? handleLockUnlockUser('') : setModal(true)
						}>
						{user.isLocked ? (
							<FontAwesome5 name="unlock" size={30} />
						) : (
							<FontAwesome5 name="lock" size={30} />
						)}
					</TouchableOpacity>
					<TouchableOpacity
						style={{marginRight: 20}}
						onPress={() =>
							navigation.navigate(EDIT_USER, {user, refetchUsers})
						}>
						<FontAwesome5 name="edit" size={30} />
					</TouchableOpacity>
					<TouchableOpacity
						style={{marginRight: 15}}
						onPress={() =>
							navigation.navigate(DELETE_USER, {user, refetchUsers})
						}>
						<FontAwesome5 name="trash-alt" size={30} />
					</TouchableOpacity>
				</View>
			)
		})
	}, [navigation, refetchUsers, user])

	const handleLockUnlockUser = reason => {
		lockUnlockUser({
			variables: {
				id: item._id,
				reason
			}
		})
			.then(res => {
				if (res.errors) {
					console.log({title: 'Lock/Unlock user failed!'})
				} else {
					refetchUsers()
					setUser({
						...user,
						isLocked: !user.isLocked,
						numberOfTimesLocked: user.isLocked
							? user.numberOfTimesLocked
							: user.numberOfTimesLocked + 1
					})
					console.log({title: 'Lock/Unlock user success'})
				}
			})
			.catch(err => {
				console.log({err, title: 'Lock/Unlock user failed!!!!!'})
			})
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Username: {user.username}</Text>
			<Text style={styles.text}>Full name: {user.fullName}</Text>
			<Text style={styles.text}>Số lần khóa: {user.numberOfTimesLocked}</Text>
			<Text style={styles.text}>
				Trạng thái: {user.isLocked ? 'Đã khóa' : 'Không khóa'}
			</Text>

			<Modal transparent visible={modal}>
				<View style={{backgroundColor: '#000000aa', flex: 1}}>
					<ScrollView>
						<View
							style={{
								backgroundColor: '#ffffff',
								margin: 60,
								padding: 50,
								borderRadius: 10,
								flex: 1
							}}>
							<Text style={{fontSize: 22, textAlign: 'center'}}>
								Reason lock user
							</Text>
							<Formik
								validationSchema={reviewSchema}
								initialValues={{reason: ''}}
								onSubmit={values => {
									handleLockUnlockUser(values.reason)
                  setModal(false)
								}}>
								{props => (
									<View>
										<TextInput
											multiline
											style={styles.input}
											placeholder="Reason"
											onChangeText={props.handleChange('reason')}
											value={props.values.reason}
											onBlur={props.handleBlur('reason')}
										/>
										<Text style={styles.errorText}>
											{props.touched.reason && props.errors.reason}
										</Text>

										<TouchableOpacity onPress={props.handleSubmit}>
											<View style={styles.button}>
												<Text style={styles.buttonText}>OK</Text>
											</View>
										</TouchableOpacity>
										<TouchableOpacity
											style={{marginTop: 10}}
											onPress={() => setModal(false)}>
											<View style={styles.button}>
												<Text style={styles.buttonText}>Cancel</Text>
											</View>
										</TouchableOpacity>
									</View>
								)}
							</Formik>
						</View>
					</ScrollView>
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 20,
		margin: 5
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		padding: 10,
		fontSize: 18,
		borderRadius: 6
	},
	errorText: {
		color: 'crimson',
		fontWeight: 'bold',
		marginBottom: 10,
		marginTop: 6,
		textAlign: 'center'
	},
	button: {
		borderRadius: 8,
		paddingVertical: 14,
		paddingHorizontal: 10,
		backgroundColor: '#f01d71'
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		fontSize: 16,
		textAlign: 'center'
	}
})
