import React, {useLayoutEffect} from 'react'
import {Text, StyleSheet, View, TouchableOpacity, SafeAreaView} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {EDIT_SHOP, DELETE_SHOP, DISH_DETAIL, CREATE_DISH} from '../../constants'
import Loading from '../../components/Loading'
import { useQuery } from '@apollo/react-hooks'
import { DISHES_BY_SHOP } from '../../graphql'

export default function MenuDetailScreen({navigation, route}) {
	const { item, refetchShop } = route.params
	const {loading, error, data, refetch: refetchDish} = useQuery(DISHES_BY_SHOP, {
		variables: {
			idShop: item._id
		}
	}
)
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
			<Text style={styles.title}>Tên quán ăn: {item.name}</Text>
			<View>
					<SafeAreaView style={styles.container}>
						<View style={styles.header}>
							<Text style={styles.title_dish}>Danh sách các món ăn</Text>
							<TouchableOpacity
								onPress={() => navigation.navigate(CREATE_DISH, {item, refetchDish})}>
								<FontAwesome5 name="plus" size={25} />
							</TouchableOpacity>
						</View>
						<View style={styles.body}>
							{
								loading ? <Loading /> : 
								(
									data.dishesByShop.map((item, idx) => {
										return (
												<TouchableOpacity 
													onPress={() => navigation.navigate(DISH_DETAIL, {item, refetchDish})}
													key={idx}
												>	
													<ItemList 
														name={item.name} 
														id={item._id} 
													/>
												</TouchableOpacity>
										)
									})
								)
							}
						</View>
					</SafeAreaView>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 25, 
		textAlign:'center',
		color: '#d1326a',
		marginTop:10
	},
	container: {
    margin:10,
    borderColor: '#bf6363',
    borderWidth:1
	},
	header: {
		flexDirection:'row',
		justifyContent:'space-between',
    margin:10,
	},
	title_dish: {
		fontSize:20,
		textAlign:'center',
	},
	icon: {
		marginRight: 20
	}
})
