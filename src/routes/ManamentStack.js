import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {
  SHOP, ROLE, NODE, MANAMENT, ADD_SHOP, DELETE_SHOP, EDIT_SHOP ,SHOP_DETAIL
} from '../constants/index'
import ShopScreen from '../screens/Shop'
import RoleScreen from '../screens/Role'
import NodeScreen from '../screens/Node'
import ManamentScreen from '../screens/Manament'
import AddShop from '../screens/Shop/AddShop'
import DetailShop from '../screens/Shop/DetailShop'
import DeleteShop from '../screens/Shop/DeleteShop'
import EditShop from '../screens/Shop/EditShop'

const Stack = createStackNavigator()

const {Navigator, Screen} = Stack

export default function ManamentStack(props) {
	return (
		<Navigator initialRouteName={MANAMENT}>
      <Screen
				name={MANAMENT}
				component={ManamentScreen}
				options={{
					title: 'Quản lý'
				}}
			/>
			<Screen
				name={SHOP}
        component={ShopScreen}
        options={{
					title: 'Quán ăn'
				}}
			/>
			<Screen
				name={ROLE}
        component={RoleScreen}
        options={{
					title: 'Quyền'
				}}
			/>
			<Screen
				name={NODE}
        component={NodeScreen}
        options={{
					title: 'Node'
				}}
			/>
      <Screen
				name={ADD_SHOP}
        component={AddShop}
        options={{
					title: 'Thêm quán ăn'
				}}
			/>
      <Screen
				name={SHOP_DETAIL}
        component={DetailShop}
        options={{
					title: 'Chi tiết quán ăn'
				}}
			/>
      <Screen
				name={DELETE_SHOP}
        component={DeleteShop}
        options={{
					title: 'Xóa quán ăn'
				}}
			/>
      <Screen
				name={EDIT_SHOP}
        component={EditShop}
        options={{
					title: 'Sửa quán ăn'
				}}
			/>
		</Navigator>
	)
}
