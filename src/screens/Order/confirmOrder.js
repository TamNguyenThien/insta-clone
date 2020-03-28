import React, {useState, useEffect} from 'react'
import {Text, StyleSheet, View, Button} from 'react-native'
import {useQuery, useMutation} from '@apollo/react-hooks'

import {GET_ORDER_AND_MENU, CONFIRM_ORDER} from '../../graphql'
import LoadingComponent from '../../components/Loading'

export default function ConfirmOrderScreen() {
	const {data: dataOrderMenu, loading} = useQuery(GET_ORDER_AND_MENU)
	const [confirmOrder] = useMutation(CONFIRM_ORDER)
	// console.log(dataOrderMenu)
	const [isConfirm, setIsConfirm] = useState(false)
	useEffect(() => {
		setIsConfirm(
			(dataOrderMenu &&
				dataOrderMenu.currentUserOrder &&
				dataOrderMenu.currentUserOrder.isConfirmed) ||
				false
		)
	}, [dataOrderMenu])
	if (loading) {
		return <LoadingComponent />
	}
	const dish =
		dataOrderMenu.currentUserOrder &&
		dataOrderMenu.menuPublished &&
		dataOrderMenu.menuPublished.dishes.find(
			dish => dish._id === dataOrderMenu.currentUserOrder.idDish
		)

	const handleConfirm = () => {
		confirmOrder({
			variables: {
				orderId: dataOrderMenu.currentUserOrder._id
			}
		})
			.then(res => {
				if (res.errors) {
					console.log({title: 'Confirm order failed!'})
				} else {
					setIsConfirm(true)
					console.log({title: 'Confirm order success'})
				}
			})
			.catch(err => {
				console.log({err, title: 'Confirm order failed!'})
			})
	}

	return (
		<View style={styles.container}>
			{dataOrderMenu.currentUserOrder ? (
				<View>
					<Text>You have ordered {dish.name}</Text>
					<Button
						title={isConfirm ? 'has eaten' : 'Confirm'}
						onPress={handleConfirm}
						disabled={isConfirm}
					/>
				</View>
			) : (
				<Text>You have not ordered</Text>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})
