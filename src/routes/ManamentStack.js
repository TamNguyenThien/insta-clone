import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {
  SHOP, ROLE, NODE, MANAMENT
} from '../constants/index'
import ShopScreen from '../screens/Shop'
import RoleScreen from '../screens/Role'
import NodeScreen from '../screens/Node'
import ManamentScreen from '../screens/Manament'

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
		</Navigator>
	)
}
