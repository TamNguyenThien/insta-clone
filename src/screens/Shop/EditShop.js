import React, {useState} from 'react'
import {
	Text,
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native'
import {useMutation} from '@apollo/react-hooks'

import {UPDATE_SHOP} from '../../graphql'
import {SHOP_DETAIL, SHOP} from '../../constants'

export default function EditShop({navigation, route}) {
  const { item, refetchShop } = route.params
	const [name, setName] = useState(item.name)
	const [updateShop] = useMutation(UPDATE_SHOP)

	const handleEditShop = () => {
		if (name !== '') {
			updateShop({
				variables: {
					_id: item._id,
					name
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
						navigation.navigate(SHOP)
					}
				})
				.catch(error => {
					console.log(error)
				})
		}
	}

	return (
			<View style={styles.container}>
				<Text style={styles.title}>EDIT</Text>
				<TextInput
					multiline
					style={styles.input}
					value={name}
					placeholder="Name..."
					onChangeText={value => setName(value)}
				/>
				<View style={{width: '90%', marginTop: 10}}>
					<TouchableOpacity style={styles.btn} onPress={handleEditShop}>
						<Text style={styles.btnTxt}>OK</Text>
					</TouchableOpacity>
				</View>
				<View style={{width: '90%', marginTop: 10}}>
					<TouchableOpacity
						style={styles.btn}
						onPress={() =>
							navigation.navigate(SHOP_DETAIL)
						}>
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
