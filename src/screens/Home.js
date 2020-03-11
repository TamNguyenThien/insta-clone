import React from 'react'
import {Text, StyleSheet, View} from 'react-native'
import {useQuery} from '@apollo/react-hooks'
import {GET_GREETING} from '../graphql'

export default function HomeScreen() {
	const {loading, error, data} = useQuery(GET_GREETING)

	console.log(data && data)

	return (
		<View style={styles.container}>
			<Text>Home</Text>
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
