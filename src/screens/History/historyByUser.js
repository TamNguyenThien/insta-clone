import React, {useState, useEffect} from 'react'
import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import {useQuery} from '@apollo/react-hooks'

import {HISTORY_ORDER_BY_USER} from '../../graphql'

export default function HistoryByUserScreen() {
	const [showStartDate, setShowStartDate] = useState(false)
	const [showEndDate, setShowEndDate] = useState(false)
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())
	const [dataRow, setDataRow] = useState([
		{fullName: 'NGHzxczx', total: 12, _id: 1},
		{fullName: 'zxczxc', total: '12', _id: 2}
	])
	const {data: dataHistory, refetch: refetchHistory} = useQuery(
		HISTORY_ORDER_BY_USER,
		{
			variables: {
				startDate: startDate.getTime(),
				endDate: endDate.getTime()
			},
			fetchPolicy: 'network-only'
		}
	)

	const onChangeStartDate = (event, selectedDate) => {
		const currentDate = selectedDate || startDate
		setShowStartDate(false)
		setStartDate(currentDate)
		console.log(currentDate.getTime(), endDate.getTime())
	}

	const onChangeEndDate = (event, selectedDate) => {
		const currentDate = selectedDate || endDate
		setShowEndDate(false)
		setEndDate(currentDate)
		console.log(startDate.getTime(), currentDate.getTime())
	}

	useEffect(() => {
		const rowData = dataHistory && dataHistory.orderByUser
		const dataGrid =
			rowData?.map(row => {
				const newRow = row
				newRow.total = 0
				dateRange.forEach(date => {
					newRow[date] = row.orders.some(
						order =>
							moment(order.createdAt)
								.startOf('day')
								.valueOf() === moment(date, 'DD/MM/YYYY').valueOf()
					)
					newRow.total += newRow[date] ? 1 : 0
				})
				return row
			}) || []
		setDataRow(dataGrid)
	}, [dataHistory])

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => setShowStartDate(true)}
					style={styles.btn}>
					<Text style={styles.btnTxt}>From: {startDate.toDateString()}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setShowEndDate(true)}
					style={styles.btn}>
					<Text style={styles.btnTxt}>to: {endDate.toDateString()}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.content}>
				{dataRow.length > 0 ? (
					<View style={{position: 'relative'}}>
						<Text style={{...styles.left, ...styles.title}}>Full name</Text>
						<Text style={{...styles.right, ...styles.title}}>Total</Text>

						<FlatList
							keyExtractor={item => item._id}
							data={dataRow}
							renderItem={({item}) => (
								<View style={{position: 'relative', ...styles.item}}>
									<Text style={styles.left}>{item.fullName}</Text>
									<Text style={styles.right}>{item.total}</Text>
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
			{showStartDate && (
				<DateTimePicker
					testID="startDateTimePicker"
					timeZoneOffsetInMinutes={0}
					value={startDate}
					is24Hour={true}
					display="default"
					maximumDate={endDate}
					onChange={onChangeStartDate}
				/>
			)}
			{showEndDate && (
				<DateTimePicker
					testID="endDateTimePicker"
					timeZoneOffsetInMinutes={0}
					value={endDate}
					is24Hour={true}
					display="default"
					minimumDate={startDate}
					onChange={onChangeEndDate}
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
		backgroundColor: '#25f'
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
		borderRadius: 3
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
