import React from 'react'
import {Text, StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native'
import {useQuery} from '@apollo/react-hooks'
import {GET_GREETING} from '../../graphql'

export default function ManamentScreen({navigation}) {
	const {loading, error, data} = useQuery(GET_GREETING)

	// console.log(data && data)
	const manaments = [
		{
			nav: 'Shop',
			name: 'Quán ăn'
		},
		{
			nav: 'Role',
			name: 'Quyền'
		},
		{
			nav: 'Node',
			name: 'Node'
		}
	]
	return (
		<SafeAreaView style={styles.container}>
			{
				manaments.map((item,idx) => {
					return (
						<View key={idx}>
							<TouchableOpacity 
								style={styles.body}
								onPress={() => navigation.navigate(item.nav)}
							>
								<Text style={styles.item}>{item.name}</Text>		
							</TouchableOpacity>
						</View>
					)
				})
			}
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
	},
	body: {
		backgroundColor:'#94c7d1',
		opacity:0.8,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
	},
	item: {
		fontSize: 20
	},
})
