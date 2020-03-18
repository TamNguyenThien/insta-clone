import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {USER, USER_DETAIL, ADD_USER, EDIT_USER, DELETE_USER} from '../constants'
import UserScreen from '../screens/User'
import UserDetailScreen from '../screens/User/userDetail'
import AddUserScreen from '../screens/User/addUser'
import EditUserScreen from '../screens/User/editUser'
import DeleteUserScreen from '../screens/User/deleteUser'

const Stack = createStackNavigator()

const {Navigator, Screen} = Stack

export default function UserStack(props) {
	return (
		<Navigator initialRouteName={USER}>
			<Screen
				name={USER}
				component={UserScreen}
				options={{title: 'Manage User'}}
			/>
			<Screen name={USER_DETAIL} component={UserDetailScreen} />
			<Screen
				name={ADD_USER}
				component={AddUserScreen}
				options={{headerShown: false}}
			/>
			<Screen
				name={EDIT_USER}
				component={EditUserScreen}
				options={{headerShown: false}}
			/>
			<Screen
				name={DELETE_USER}
				component={DeleteUserScreen}
				options={{headerShown: false}}
			/>
		</Navigator>
	)
}
