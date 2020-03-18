import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {
	MENU,
	MENU_DETAIL,
	ADD_MENU,
	EDIT_MENU,
	DELETE_MENU
} from '../constants/index'
import MenuScreen from '../screens/Menu/Menu'
import MenuDetailScreen from '../screens/Menu/MenuDetail'
import AddMenu from '../screens/Menu/AddMenu'
import EditMenu from '../screens/Menu/EditMenu'
import DeleteMenu from '../screens/Menu/DeleteMenu'

const Stack = createStackNavigator()

const {Navigator, Screen} = Stack

export default function MenuStack(props) {
	return (
		<Navigator initialRouteName={MENU}>
			<Screen
				name={MENU}
				component={MenuScreen}
				options={{
					title: 'Manage Menu'
				}}
			/>
			<Screen name={MENU_DETAIL} component={MenuDetailScreen} />
			<Screen
				name={ADD_MENU}
				component={AddMenu}
				options={{headerShown: false}}
			/>
			<Screen
				name={EDIT_MENU}
				component={EditMenu}
				options={{headerShown: false}}
			/>
			<Screen
				name={DELETE_MENU}
				component={DeleteMenu}
				options={{headerShown: false}}
			/>
		</Navigator>
	)
}
