import React, {useLayoutEffect} from 'react'
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
// import {useQuery} from '@apollo/react-hooks'
// import {EDIT_MENU} from '../../graphql'
import {EDIT_MENU, DELETE_MENU} from '../../constants'

export default function MenuDetailScreen({navigation, route}) {
	const {item, refetchMenu} = route.params

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity
						style={{marginRight: 20}}
						onPress={() => navigation.navigate(EDIT_MENU, {item, refetchMenu})}>
						<FontAwesome5 name="edit" size={30} />
					</TouchableOpacity>
					<TouchableOpacity
						style={{marginRight: 15}}
						onPress={() =>
							navigation.navigate(DELETE_MENU, {item, refetchMenu})
						}>
						<FontAwesome5 name="trash-alt" size={30} />
					</TouchableOpacity>
				</View>
			)
		})
	}, [navigation])

	console.log(item)

	return (
		<View style={styles.container}>
			<Text style={{fontSize: 25}}>{item.name}</Text>
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
