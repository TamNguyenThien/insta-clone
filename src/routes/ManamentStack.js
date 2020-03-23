import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {
<<<<<<< HEAD
  SHOP, ROLE, NODE, MANAMENT, ADD_SHOP, DELETE_SHOP, EDIT_SHOP ,SHOP_DETAIL, DISH_DETAIL, EDIT_DISH, DELETE_DISH,CREATE_DISH
=======
	SHOP,
	ROLE,
	ADD_ROLE,
	EDIT_ROLE,
	DELETE_ROLE,
	NODE,
	MANAMENT,
	ADD_SHOP,
	DELETE_SHOP,
	EDIT_SHOP,
	SHOP_DETAIL,
	DISH_DETAIL,
	EDIT_DISH,
	DELETE_DISHES,
	CREATE_DISH
>>>>>>> f2f31c7947f16a24e4ff42e7de3c59c0fc39ab2a
} from '../constants/index'
import ShopScreen from '../screens/Shop'
import RoleScreen from '../screens/Role'
import AddRoleScreen from '../screens/Role/addRole'
import EditRoleScreen from '../screens/Role/editRole'
import DeleteRoleScreen from '../screens/Role/deleteRole'
import NodeScreen from '../screens/Node'
import ManamentScreen from '../screens/Manament'
import AddShop from '../screens/Shop/AddShop'
import DetailShop from '../screens/Shop/DetailShop'
import DeleteShop from '../screens/Shop/DeleteShop'
import EditShop from '../screens/Shop/EditShop'
import DetailDish from '../screens/Dish/DetailDish'
import EditDish from '../screens/Dish/EditDish'
import AddDish from '../screens/Dish/AddDish'
import DeleteDish from '../screens/Dish/DeleteDish'

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
				name={ADD_ROLE}
				component={AddRoleScreen}
				options={{headerShown: false}}
			/>
			<Screen
				name={EDIT_ROLE}
				component={EditRoleScreen}
				options={{headerShown: false}}
			/>
			<Screen
				name={DELETE_ROLE}
				component={DeleteRoleScreen}
				options={{headerShown: false}}
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
			<Screen
				name={DISH_DETAIL}
				component={DetailDish}
				options={{
					title: 'Chi tiết món ăn'
				}}
			/>
			<Screen
				name={EDIT_DISH}
				component={EditDish}
				options={{
					title: 'Sửa món ăn'
				}}
			/>
			<Screen
				name={CREATE_DISH}
				component={AddDish}
				options={{
					title: 'Thêm món ăn'
				}}
			/>
			<Screen
				name={DELETE_DISHES}
				component={DeleteDish}
				options={{
					title: 'Xóa món ăn'
				}}
			/>
		</Navigator>
	)
}
