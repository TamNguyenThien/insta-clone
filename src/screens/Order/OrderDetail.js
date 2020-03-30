import React, {useEffect, useState} from 'react'
import {ORDER, CANCEL_ORDER} from '../../constants'
import Loading from '../../components/Loading'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {Text, StyleSheet, View, TouchableOpacity, SafeAreaView, Alert} from 'react-native'
import { CREATE_ORDER, ME } from '../../graphql'

export default function OrderDetailScreen({navigation, route}) {
	const {dataMenu, dish, setIsActive} = route.params
	const {loading: loadingMe, data: dataMe} = useQuery(ME)
	const [createOrder, {loading: loadingOrder, data: dateOrder}] = useMutation(CREATE_ORDER)
	const Create = () => {
		createOrder({
			variables: {
				input: {
					idMenu: dataMenu.menuPublishedByNode._id,
					idDish: dish._id,
					idUser: dataMe.me._id
				}
			}
		}).then((res) => {
				setIsActive(false)
				navigation.navigate(ORDER)
				navigation.navigate(CANCEL_ORDER,{dataMenu, dish, idOrder: res.data.createOrder._id, setIsActive})
				alert('Đặt món thành công') 
		})
		.catch(error => {
			console.log(error)
		})
	}
	return (
		<SafeAreaView style={{alignItems:'center'}}>
			<View style={styles.container}>
				<Text style={styles.title}>{dish.name}</Text>
					<View style={styles.body}>
					</View>
			</View>	
			{
				<TouchableOpacity style={styles.btn} onPress={() => Create()}>
					<Text style={styles.btnTxt}>Đặt món</Text> 
				</TouchableOpacity>
			}
		</SafeAreaView>
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
		borderWidth:1,
		width: '90%',
		height: '80%'
	},
	btn: {
		borderRadius: 5,
		paddingVertical: 14,
		paddingHorizontal: 10,
		backgroundColor: '#f01d71',
		width:100,
		alignItems:'center',
	},
})
