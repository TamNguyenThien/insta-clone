import React, {useEffect, useState} from 'react'
import {Text, StyleSheet, View, TouchableOpacity, SafeAreaView, Alert} from 'react-native'
import {HOME} from '../../constants'
import Loading from '../../components/Loading'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CONFIRM_ORDER, CANCEL_ORDER, IS_ACTIVE_CONFIRM_ORDER} from '../../graphql'

export default function OrderDetailScreen({navigation, route}) {
  const {dataMenu, dish, idOrder, setIsActive} = route.params
	const [cancelOrder] = useMutation(CANCEL_ORDER)
	const [confirmOrder] = useMutation(CONFIRM_ORDER)
	const {loading, error, data} = useQuery(IS_ACTIVE_CONFIRM_ORDER)
	const [isConfirm, setIsConfirm] = useState()

	useEffect(() => {
		if(!loading) setIsConfirm(data.isActiveConfirmOrder)
	})
	const Detele = () => {
		Alert.alert(
			'Hủy món ăn',
			'Bạn có chắc chắn muốn hủy món ăn không ?',
			[
				{text: 'OK', onPress: () => cancelOrder({
					variables: {
						input: {
							idMenu: dataMenu.menuPublishedByNode._id,
							idOrder: idOrder
						}
					}
				}).then(res => {
					if (res.errors) {
						console.log({
							type: 'error',
							content: res.errors.message
						})
					} else {
            setIsActive(true)
            navigation.navigate(HOME)
						alert('hủy món thành công')
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

	const Confirm = () => {
		confirmOrder({
			variables: {
				orderId: idOrder
			}
		}).then(() => {
			setIsActive(true)
			navigation.navigate(HOME)
			alert('Xác nhận thành công')
		}).catch(error => {
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
				isConfirm ? 
				<TouchableOpacity style={styles.btn} onPress={() => Confirm()}>
					<Text style={styles.btnTxt}>Xác nhận</Text> 
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
