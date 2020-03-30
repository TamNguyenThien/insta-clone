import React, {useEffect, useState} from 'react'
import {Text, StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView, Picker} from 'react-native'
import {ORDER_DETAIL} from '../../constants'
import Loading from '../../components/Loading'
import { useQuery } from '@apollo/react-hooks'
import { GET_MENU_PUBLISHED_BY_NODE, GET_NODES, CURRENT_USER_ORDER } from '../../graphql'

export default function OrderScreen({navigation}) {
	const [node, setNode] = useState('default')
	const [state, setState] = useState({
			dishesByMenu: []
	})
	const {loading: loadingNode, data: dataNode} = useQuery(GET_NODES)
	const {loading: loadingMenu, data: dataMenu} = useQuery(GET_MENU_PUBLISHED_BY_NODE, {
		variables: {
			idNode: node
		}
	})
	const {loading: loadingCurrentUserOrder, data: dataCurrentUserOrder} = useQuery(CURRENT_USER_ORDER)

	useEffect(() => {
		if(!loadingMenu) {
			if(dataMenu.menuPublishedByNode !== null) {
				setState(prev => ({
					...prev,
					dishesByMenu: dataMenu.menuPublishedByNode.dishes
				}))
			}
		}
	},[dataMenu])
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Thực đơn hôm nay</Text>
			<Picker
				selectedValue={node}
				onValueChange={itemValue => setNode(itemValue)}>
					<Picker.Item label='Chọn Chi Nhánh làm việc' value='default'/>
				{dataNode &&
					dataNode.nodes.map(val => (
						<Picker.Item label={val.name} value={val._id} key={val._id} />
					))}
			</Picker>
			<View>
						<View style={styles.body}>
							<ScrollView style={styles.scrollView}>
							{
								loadingMenu ? <Loading /> : 
								node !== 'default' ? 
									dataMenu.menuPublishedByNode !== null ? 
											state.dishesByMenu.map((dish,idx) => {
											return (
													<TouchableOpacity 
														key={idx} 
														onPress={() => navigation.navigate(ORDER_DETAIL, {dataMenu, dish})}
													>
														<ItemList 
															name={dish.name}
															id={dish._id}
														/>
													</TouchableOpacity>
											)
										})
									: <Text style={{fontSize:18, color: 'red', textAlign:'center'}}>Chưa thể đặt cơm!!!</Text>
								: null
							}
							</ScrollView>
						</View>
			</View>
		</SafeAreaView>
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
	scrollView: {
    backgroundColor: 'pink'
  },
	icon: {
		marginRight: 20
	}
})
