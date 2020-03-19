import React, {useLayoutEffect} from 'react'
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import {EDIT_USER, DELETE_USER} from '../../constants'

export default function UserDetailScreen({navigation, route}) {
	const {item, refetchUsers} = route.params

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity
						style={{marginRight: 15}}
						onPress={() => alert('Backend error')}>
						{item.isLocked ? (
							<FontAwesome5 name="unlock" size={30} />
						) : (
							<FontAwesome5 name="lock" size={30} />
						)}
					</TouchableOpacity>
					<TouchableOpacity
						style={{marginRight: 20}}
						onPress={() =>
							navigation.navigate(EDIT_USER, {item, refetchUsers})
						}>
						<FontAwesome5 name="edit" size={30} />
					</TouchableOpacity>
					<TouchableOpacity
						style={{marginRight: 15}}
						onPress={() =>
							navigation.navigate(DELETE_USER, {item, refetchUsers})
						}>
						<FontAwesome5 name="trash-alt" size={30} />
					</TouchableOpacity>
				</View>
			)
		})
	}, [navigation, refetchUsers, item])

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Username: {item.username}</Text>
			<Text style={styles.text}>Full name: {item.fullName}</Text>
			<Text style={styles.text}>Số lần khóa: {item.numberOfTimesLocked}</Text>
			<Text style={styles.text}>
				Trạng thái: {item.isLocked ? 'Đã khóa' : 'Không khóa'}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 20,
		margin: 5
	}
})
