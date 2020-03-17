import React, {useState} from 'react'
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import {useMutation} from '@apollo/react-hooks'

import {DELETE_MENU} from '../../graphql'

import {MENU} from '../../constants'

export default function DeleteMenu({navigation, route}) {
	const [deleteMenu] = useMutation(DELETE_MENU)
	const {item, refetchMenu} = route.params

	const handleDeleteMenu = () => {
		deleteMenu({
			variables: {
				id: item._id
			}
		}).then(() => {
			refetchMenu()
			console.log({
				title: 'Thành công'
			})
		})
		navigation.navigate(MENU)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>WARNING</Text>
			<Text style={{fontSize: 20, marginBottom: 20}}>
				Bạn có chắc muốn xóa không?
			</Text>
			<View style={{width: '90%', marginTop: 10}}>
				<TouchableOpacity style={styles.btn} onPress={handleDeleteMenu}>
					<Text style={styles.btnTxt}>OK</Text>
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
