import React, {useEffect, useState} from 'react'
import {Text, StyleSheet, View, TouchableOpacity, SafeAreaView, Alert} from 'react-native'
import {ORDER} from '../../constants'
import Loading from '../../components/Loading'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CREATE_ORDER, ME, CANCEL_ORDER } from '../../graphql'

export default function OrderDetailScreen({navigation, route}) {
	const {dataMenu, dish} = route.params
	const [isOrder, setIsOrder] = useState(true)
	const [cancelOrder] = useMutation(CANCEL_ORDER)
	const {loading: loadingMe, data: dataMe} = useQuery(ME)
	const [createOrder, {loading: loadingOrder, data: dateOrder}] = useMutation(CREATE_ORDER)
	console.log(isOrder)
	const Create = () => {
		createOrder({
			variables: {
				input: {
					idMenu: dataMenu.menuPublishedByNode._id,
					idDish: dish._id,
					idUser: dataMe.me._id
				}
			}
		}).then(res => {
			if (res.errors) {
				console.log({
					type: 'error',
					content: res.errors.message
				})
			} else {
				alert('Đặt món thành công')
				setIsOrder(prev => 
					!prev
				)
			}
		})
		.catch(error => {
			console.log(error)
		})
	}
	const Detele = () => {
		Alert.alert(
			'Hủy món ăn',
			'Bạn có chắc chắn muốn hủy món ăn không ?',
			[
				{text: 'OK', onPress: () => cancelOrder({
					variables: {
						input: {
							idMenu: dataMenu.menuPublishedByNode._id,
							isOrder: dateOrder._id
						}
					}
				}).then(res => {
					if (res.errors) {
						console.log({
							type: 'error',
							content: res.errors.message
						})
					} else {
						alert('hủy món thành công')
						setIsOrder(prev => 
							!prev
						)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			],
			{ cancelable: false }
		)
	}
	return (
		<SafeAreaView style={{alignItems:'center'}}>
			<View style={styles.container}>
				<Text style={styles.title}>com chien</Text>
					<View style={styles.body}>
					</View>
			</View>	
			{
				isOrder ? <TouchableOpacity style={styles.btn} onPress={() => Create()}>
					<Text style={styles.btnTxt}>Đặt món</Text> 
					</TouchableOpacity> :
					<TouchableOpacity style={styles.btn} onPress={() => Detele()}>
						<Text style={styles.btnTxt}>Hủy món</Text> 
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
