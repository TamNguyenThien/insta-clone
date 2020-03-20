import React, {useLayoutEffect} from 'react'
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {EDIT_DISH, DELETE_DISHES} from '../../constants'

export default function DishDetailScreen({navigation, route}) {
  const { item, refetchDish } = route.params
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity
						style={{marginRight: 20}}
						onPress={() => navigation.navigate(EDIT_DISH, {item, refetchDish})}>
						<FontAwesome5 name="edit" size={25} />
					</TouchableOpacity>
					<TouchableOpacity
						style={{marginRight: 15}}
						onPress={() =>
							navigation.navigate(DELETE_DISHES, {item, refetchDish})
						}>
						<FontAwesome5 name="trash-alt" size={25} />
					</TouchableOpacity>
				</View>
			)
		})
	}, [navigation])

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{item.name}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
	title: {
    fontSize: 25, 
		color: '#d1326a',
	}
})
