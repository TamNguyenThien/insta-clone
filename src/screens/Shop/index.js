import React, {useState, useLayoutEffect} from 'react'
import {Text, StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {useQuery} from '@apollo/react-hooks'
import {SHOPS} from '../../graphql'
import {SHOP_DETAIL, ADD_SHOP} from '../../constants'
import ItemList from '../../components/ItemList'
import Loading from '../../components/Loading'

export default function ShopScreen({navigation}) {
	const {loading, error, data, refetch: refetchShop} = useQuery(SHOPS)

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{marginRight: 15}}
					onPress={() => navigation.navigate(ADD_SHOP, {refetchShop})}>
					<FontAwesome5 name="plus" size={25} />
				</TouchableOpacity>
			)
		})
	}, [navigation])

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
			</View>
			<View style={styles.body}>
				{
					loading ? <Loading /> : 
					(
						data.shops.map((item, idx) => {
							return (
							<TouchableOpacity 
								onPress={() => navigation.navigate(SHOP_DETAIL, {
									item, 
									refetchShop
								})}
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
		fontSize:30,
		textAlign:'center',
		flex:1
	},
	body: {	
		marginTop: 20
	},
	icon: {
		marginRight: 20
	}
})
