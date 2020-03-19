import React, {useLayoutEffect} from 'react'
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {EDIT_SHOP, DELETE_SHOP} from '../../constants'

export default function MenuDetailScreen({navigation, route}) {
  const { item, refetchShop } = route.params
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity
						style={{marginRight: 20}}
						onPress={() => navigation.navigate(EDIT_SHOP, {item, refetchShop})}>
						<FontAwesome5 name="edit" size={25} />
					</TouchableOpacity>
					<TouchableOpacity
						style={{marginRight: 15}}
						onPress={() =>
							navigation.navigate(DELETE_SHOP, {item, refetchShop})
						}>
						<FontAwesome5 name="trash-alt" size={25} />
					</TouchableOpacity>
				</View>
			)
		})
	}, [navigation])

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
