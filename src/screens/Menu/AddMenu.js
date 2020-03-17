import React, {useState} from 'react'
import {
	Text,
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native'
import {useMutation} from '@apollo/react-hooks'

import {CREATE_MENU} from '../../graphql'

import {MENU} from '../../constants'

export default function AddMenu({navigation, route}) {
	const [name, setName] = useState('')
	const [createMenu] = useMutation(CREATE_MENU)
	const {refetchMenu, node} = route.params
	console.log({name, node})

	const handleCreateMenu = () => {
		console.log({name, node})
		if (name !== '') {
			createMenu({
				variables: {
					input: {
						name,
						idNode: node
					}
				}
			})
				.then(res => {
					if (res.errors) {
						console.log({
							type: 'error',
							content: res.errors.message
						})
					} else {
						refetchMenu()
						console.log({
							title: 'Thành công'
						})
					}
				})
				.catch(error => {
					// console.log(error)
					console.log({
						title: 'Create failed!'
					})
				})
		}
		navigation.navigate(MENU, {isRefetch: true})
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text style={styles.title}>CREATE</Text>
				<TextInput
					multiline
					style={styles.input}
					placeholder="Name..."
					onChangeText={value => setName(value)}
				/>
				<View style={{width: '90%', marginTop: 10}}>
					<TouchableOpacity style={styles.btn} onPress={handleCreateMenu}>
						<Text style={styles.btnTxt}>Create</Text>
					</TouchableOpacity>
				</View>
				<View style={{width: '90%', marginTop: 10}}>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => navigation.navigate(MENU)}>
						<Text style={styles.btnTxt}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10
	},
	form: {
		borderWidth: 2,
		borderColor: '#000',
		width: '95%',
		height: 'auto',
		margin: 5
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
		color: '#333',
		letterSpacing: 1,
		marginBottom: 20
	},
	input: {
		marginBottom: 10,
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderWidth: 2,
		borderColor: '#999',
		width: '90%'
	},
	btn: {
		borderRadius: 8,
		paddingVertical: 14,
		paddingHorizontal: 10,
		backgroundColor: '#f01d71'
	},
	btnTxt: {
		color: 'white',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		fontSize: 16,
		textAlign: 'center'
	}
})
