import React, {useLayoutEffect} from 'react'
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	Button,
	FlatList
} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {useQuery} from '@apollo/react-hooks'

import {ADD_USER, USER_DETAIL} from '../../constants'
import {GET_USERS} from '../../graphql'

export default function UserScreen({navigation}) {
	const {data: dataUsers, refetch: refetchUsers} = useQuery(GET_USERS, {
		fetchPolicy: 'network-only'
	})

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{marginRight: 15}}
					onPress={() => navigation.navigate(ADD_USER, {refetchUsers})}>
					<FontAwesome5 name="plus" size={30} />
				</TouchableOpacity>
			)
		})
	}, [navigation, refetchUsers])

	return (
		<View style={styles.container}>
			{/* <Button title="log" onPress={() => console.log(dataUsers)} /> */}
			<View
				style={{borderWidth: 2, borderColor: '#999', width: '98%', flex: 1}}>
				<View style={styles.content}>
					<Text style={{...styles.header, ...styles.name}}>Username</Text>
					<Text style={{...styles.header, ...styles.number}}>Locked</Text>
				</View>
				<View style={{flex: 1}}>
					<FlatList
						keyExtractor={item => item._id}
						data={dataUsers ? dataUsers.users : []}
						renderItem={({item}) => (
							<View>
								<TouchableOpacity
									style={styles.content}
									onPress={() =>
										navigation.navigate(USER_DETAIL, {item, refetchUsers})
									}>
									<Text style={{...styles.name, ...styles.item}}>
										{item.username}
									</Text>
									<View style={{...styles.number, ...styles.item}}>
										<Text>{item.numberOfTimesLocked}</Text>
									</View>
								</TouchableOpacity>
							</View>
						)}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	header: {
		fontSize: 25,
		fontWeight: 'bold'
	},
	content: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		margin: 5
	},
	item: {
		fontSize: 20
	},
	name: {
		marginLeft: 10,
		marginRight: 'auto'
	},
	number: {
		marginLeft: 'auto',
		marginRight: 10
	}
})
