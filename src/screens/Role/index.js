import React from 'react'
import {Text, StyleSheet, View, SafeAreaView} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {useQuery} from '@apollo/react-hooks'
import {GET_GREETING} from '../../graphql'

export default function RoleScreen({navigation}) {
	const {loading, error, data} = useQuery(GET_GREETING)

	console.log(data && data)

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<FontAwesome5 
					name={'chevron-left'} 
					size={30}
					onPress={() => navigation.navigate('Manament')}
				/>
				<Text style={styles.title}>Quyền</Text>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		margin:10
	},
	header: {
		flexDirection: 'row',
	},
	title: {
		fontSize:20,
		textAlign:'center',
		flex:1
	}
})
