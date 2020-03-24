import React, {useLayoutEffect, useState, useEffect} from 'react'
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MenuPicker from './MenuPicker'

export default function MenuDetailScreen({navigation, route}) {
	const {item, refetchMenu, dataShop} = route.params

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity
						style={{marginRight: 20}}
						onPress={() => navigation.navigate(EDIT_MENU, {item, refetchMenu})}>
						<FontAwesome5 name="edit" size={30} />
					</TouchableOpacity>
					<TouchableOpacity
						style={{marginRight: 15}}
						onPress={() =>
							navigation.navigate(DELETE_MENU, {item, refetchMenu})
						}>
						<FontAwesome5 name="trash-alt" size={30} />
					</TouchableOpacity>
				</View>
			)
		})
	}, [navigation])
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tên menu: {item.name}</Text>
			<View>
				<MenuPicker dataShop={dataShop} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 25, 
		textAlign:'center',
		color: '#d1326a',
		marginTop:10
	},
	container: {
    margin:10,
    borderColor: '#bf6363',
    borderWidth:1
	},
	header: {
		flexDirection:'row',
		justifyContent:'space-between',
    margin:10,
	},
	title_dish: {
		fontSize:20,
		textAlign:'center',
	},
	icon: {
		marginRight: 20
	}
})