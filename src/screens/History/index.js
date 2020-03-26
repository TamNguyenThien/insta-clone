import React from 'react'
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native'

import {HISTORY_BY_USER, HISTORY_BY_ORDER} from '../../constants'

export default function HistoryScreen({navigation}) {
	const historys = [
		{nav: HISTORY_BY_USER, name: 'History By User'},
		{nav: HISTORY_BY_ORDER, name: 'History By Order'}
	]

	return (
		<View style={styles.container}>
			{historys.map((item, idx) => (
				<View key={idx}>
					<TouchableOpacity
						style={styles.body}
						onPress={() => navigation.navigate(item.nav)}>
						<Text style={styles.item}>{item.name}</Text>
					</TouchableOpacity>
				</View>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		margin: 10
	},
	header: {
		flexDirection: 'row'
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		flex: 1
	},
	body: {
		backgroundColor: '#94c7d1',
		opacity: 0.8,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30
	},
	item: {
		fontSize: 20
	}
})
