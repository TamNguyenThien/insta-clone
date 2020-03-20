import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {
	MANAGE,
	ROLE,
	ADD_ROLE,
	EDIT_ROLE,
	DELETE_ROLE
} from '../constants/index'
import ManageScreen from '../screens/Manage'
import RoleScreen from '../screens/Manage/role'
import AddRoleScreen from '../screens/Manage/addRole'
import EditRoleScreen from '../screens/Manage/editRole'
import DeleteRoleScreen from '../screens/Manage/deleteRole'

const Stack = createStackNavigator()

const {Navigator, Screen} = Stack

export default function ManageStack() {
	return (
		<Navigator initialRouteName={MANAGE}>
			<Screen name={MANAGE} component={ManageScreen} />
			<Screen name={ROLE} component={RoleScreen} />
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
		</Navigator>
	)
}
