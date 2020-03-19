import React, {useState} from 'react'
import {
	Text,
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
} from 'react-native'
import {useMutation} from '@apollo/react-hooks'

import {CREATE_SHOP} from '../../graphql'

import {SHOP} from '../../constants'

export default function AddMenu({navigation, route}) {
	const {refetchShop} = route.params
	const [name, setName] = useState('')
	const [createShop] = useMutation(CREATE_SHOP)
	const handleCreateShop = () => {
		if (name !== '') {
			createShop({
				variables: {
					input: {
						name,
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
						refetchShop()
						console.log({
							title: 'Thành công'
						})
					}
				})
				.catch(error => {
					console.log({
						title: 'Create failed!'
					})
				})
		}
		navigation.navigate(SHOP)
	}

	return (
			<View style={styles.container}>
				<Text style={styles.title}>CREATE</Text>
				<TextInput
					multiline
					style={styles.input}
					placeholder="Name..."
					onChangeText={value => setName(value)}
				/>
				<View style={{width: '90%', marginTop: 10}}>
					<TouchableOpacity style={styles.btn} onPress={handleCreateShop}>
						<Text style={styles.btnTxt}>Create</Text>
					</TouchableOpacity>
				</View>
				<View style={{width: '90%', marginTop: 10}}>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => navigation.navigate(SHOP)}>
						<Text style={styles.btnTxt}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
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
