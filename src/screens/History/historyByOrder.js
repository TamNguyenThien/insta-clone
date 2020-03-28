import React, {useState, useEffect} from 'react'
import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import {useQuery} from '@apollo/react-hooks'

import {HISTORY_GET_LOCK_MENUS, HISTORY_GET_ORDERS} from '../../graphql'

export default function HistoryByOrderScreen() {
	const [showDate, setShowDate] = useState(false)
	const [date, setDate] = useState(new Date())
	const [dataRow, setDataRow] = useState([])
	const getStartDate = now => {
		const d = new Date(now.getTime())
		return d.setHours(0, 0, 0)
	}

	const getEndDate = now => {
		const d = new Date(now.getTime())
		return d.setHours(24, 0, 0)
	}
	const {data: dataHistory, refetch: refetchHistory} = useQuery(
		HISTORY_GET_LOCK_MENUS,
		{
			variables: {
				by: 'DATE',
				variables: {
					startDate: getStartDate(date),
					endDate: getEndDate(date)
				}
			},
			fetchPolicy: 'network-only'
		}
	)
	useEffect(() => {
		try {
			const menus = dataHistory && dataHistory.getLockMenus
			if (menus && menus.length) {
				const {data: dataOrders} = useQuery(HISTORY_GET_ORDERS, {
					variables: {
						by: 'MENU',
						variables: {
							idMenu: menus[0]._id
						}
					}
				})

				const orders = dataOrders && dataOrders.getOrders
				if (orders && menus) {
					const {dishes} = menus[0]
					const datasOrder = []
					dishes.forEach(({_id, name}) => {
						const dish = {_id, name, usersOrdered: [], orderCount: 0}
						orders.forEach(({idDish, idUser, note, isConfirmed}) => {
							if (_id === idDish) {
								dish.orderCount++
								dish.usersOrdered.push({
									idUser,
									note,
									count: 1,
									isConfirmed
								})
							}
						})
						if (dish.orderCount > 0) {
							datasOrder.push(dish)
						}
					})
					setDataRow(datasOrder)
					return
				}
			}
		} catch (error) {
			setDataRow([])
			console.log(error)
		}
	}, [])

	const onChangeDate = (event, selectedDate) => {
		const currentDate = selectedDate || startDate
		setShowDate(false)
		setDate(currentDate)
		// console.log(currentDate.getTime(), endDate.getTime())
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => setShowDate(true)} style={styles.btn}>
					<Text style={styles.btnTxt}>Date: {date.toDateString()}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.content}>
				{dataRow.length > 0 ? (
					<View style={{position: 'relative'}}>
						<Text style={{...styles.left, ...styles.title}}>Dish</Text>
						<Text style={{...styles.right, ...styles.title}}>Ordered</Text>

						<FlatList
							keyExtractor={item => item._id}
							data={dataRow}
							renderItem={({item}) => (
								<View style={{position: 'relative', ...styles.item}}>
									<Text style={styles.left}>{item.name}</Text>
									<Text style={styles.right}>{item.orderCount}</Text>
								</View>
							)}
						/>
					</View>
				) : (
					<View style={{alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize: 30}}>No data</Text>
					</View>
				)}
			</View>
			{showDate && (
				<DateTimePicker
					testID="dateTimePicker"
					timeZoneOffsetInMinutes={0}
					value={date}
					is24Hour={true}
					display="default"
					onChange={onChangeDate}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		// alignItems: 'center'
		// width:'50%'
	},
	content: {
		flex: 1,
		marginTop: 10
	},
	btn: {
		marginTop: 10,
		borderRadius: 8,
		paddingVertical: 14,
		paddingHorizontal: 10,
		backgroundColor: '#25f',
		marginLeft: 20,
		marginRight: 20
	},
	btnTxt: {
		color: 'white',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		fontSize: 16,
		textAlign: 'center'
	},
	title: {
		fontSize: 20
	},
	item: {
		borderWidth: 1,
		marginTop: 5,
		borderRadius: 3,
		marginLeft: 10,
		marginRight: 10
	},
	left: {
		left: 15,
		marginTop: 5,
		marginBottom: 5
	},
	right: {
		position: 'absolute',
		right: 15,
		marginTop: 5,
		marginBottom: 5
	}
})
