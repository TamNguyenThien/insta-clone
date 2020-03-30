import React, {useLayoutEffect, useState, useEffect} from 'react'
import {Text, StyleSheet, View, TouchableOpacity,SafeAreaView, Picker} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {useQuery, useMutation} from '@apollo/react-hooks'
import {DISHES_BY_SHOP, UPDATE_MENU_IS_SAVE, PUBLISH_MENU,UNPUBLISH_MENU} from '../../graphql'
import Loading from '../../components/Loading'
import ItemListCount from '../../components/ItemListCount'
import {DELETE_MENU, EDIT_MENU, MENU} from '../../constants'

export default function MenuDetailScreen({navigation, route}) {
	const {item, refetchMenu, dataShop, node} = route.params 
	const [valuePicker, setValuePicker] = useState(
		item.idShop ? item.idShop : dataShop.shops[0]._id
	)
	const {loading, error, data: dataDish} = useQuery(DISHES_BY_SHOP, {
		variables: {
			idShop: valuePicker
		}
	})
	console.log(node)
	const [publishMenu] = useMutation(PUBLISH_MENU)
	const [unPublishMenu] = useMutation(UNPUBLISH_MENU)
	const [updateMenuIsSaved] = useMutation(UPDATE_MENU_IS_SAVE)
	const [state, setState] = useState({
		dishesByShop: []
	})
	React.useEffect(() => {
		if (!loading) {
			const arr = []
				dataDish.dishesByShop.map((dish) => {
					var k = 0
					item.dishes.map(itemDish => {
						if(itemDish.name == dish.name) {
							arr.push({
								_id: dish._id,
								name: dish.name,
								count: itemDish.count,
							})
						} else {
							k++
						}
					})
					if(k == item.dishes.length) {
						arr.push({
							_id: dish._id,
							name: dish.name,
							count: 0,
						})
					}
				})
				setState(prev => ({
					...prev,
					dishesByShop: arr
				}))
		}
	}, [dataDish])
	const onChangeDish = ({_id, count}) => {
		setState(prev => ({
			...prev,
			dishesByShop: prev.dishesByShop.map(dish => {
				if(dish._id === _id) {
					return {
						_id,
						name: dish.name,
						count
					}
				}
				return dish
			})
		}))
	}

	const saveMenu = () => {
		updateMenuIsSaved({
			variables: {
				input: state.dishesByShop,
				menuId: item._id,
				shopId: valuePicker,
				nodeId: node
			}
		}).then(() => {
			refetchMenu()
			navigation.navigate(MENU)
			alert('Lưu thành công')
		})
		setValuePicker(item.idShop)
	}
console.log(item.name)
	const menuPublish = () => {
		publishMenu({
			variables: {
				name: item.name
			}
		}).then(() => {
			refetchMenu()
			navigation.navigate(MENU)
			alert('Publish thành công')
		})
	}

	const menuUnPublish = () => {
		unPublishMenu({
			variables: {
				name: item.name
			}
		}).then(() => {
			refetchMenu()
			navigation.navigate(MENU)
			alert('UnPublish thành công')
		})
	}

		navigation.setOptions({
			headerRight: () => (
				<View style={{flexDirection: 'row'}}>
						{
							item.isPublished ? 
							(<TouchableOpacity
								style={{marginRight: 15}}
								onPress={() => menuUnPublish()}
								>
								<FontAwesome5 name="frown" size={20} /> 
							</TouchableOpacity>) : (
								<TouchableOpacity
								style={{marginRight: 15}}
								onPress={() => menuPublish()}
								>
								<FontAwesome5 name="smile" size={20} /> 
							</TouchableOpacity>
							)
						}
					<TouchableOpacity
						style={{marginRight: 15}}
						onPress={() => saveMenu()}>
						<FontAwesome5 name="save" size={20} />
					</TouchableOpacity>
					<TouchableOpacity
						style={{marginRight: 15}}
						onPress={() => navigation.navigate(EDIT_MENU, {item, refetchMenu})}>
						<FontAwesome5 name="edit" size={20} />
					</TouchableOpacity>
					<TouchableOpacity
						style={{marginRight: 15}}
						onPress={() =>
							navigation.navigate(DELETE_MENU, {item, refetchMenu})
						}>
						<FontAwesome5 name="trash-alt" size={20} />
					</TouchableOpacity>
				</View>
			)
		})
		const onChangePicker = (itemValue) => {
			setValuePicker(itemValue)
		}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tên menu: {item.name}</Text>
			<View>
				<SafeAreaView style={styles.container}>
      <Picker
        selectedValue={valuePicker}
        itemStyle={{height: 100}}
        onValueChange={(itemValue) => onChangePicker(itemValue)}>
        {
          dataShop.shops.map((shop,idx) => {
            return (
              <Picker.Item key={idx} label={shop.name} value={shop._id} />
            )
          })
        }
      </Picker>
      {
        loading ? <Loading /> : (
          state.dishesByShop.map(((dish,idx) => {
						return (
							<ItemListCount dish={dish} key={idx} onChange={onChangeDish} dataCountDishByMenu={dish.count} />
						)
          }))
        )
      }
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