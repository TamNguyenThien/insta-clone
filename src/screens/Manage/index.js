import React from 'react'
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import {ROLE} from '../../constants'

export default function RoleScreen({navigation}) {
	return (
		<View style={styles.container}>
			<View style={{position: 'relative', marginTop: 100}}>
				<Text style={{position: 'absolute', fontSize: 20}}>Manage Role </Text>
				<TouchableOpacity
					style={{position: 'absolute', right: 5}}
					onPress={() => navigation.navigate(ROLE)}>
					<FontAwesome5 name={'chevron-right'} size={20} />
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 10
	}
})
