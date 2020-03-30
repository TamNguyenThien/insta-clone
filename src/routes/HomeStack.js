import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {
	HOME,
	CANCEL_ORDER
} from '../constants/index'
import HomeScreen from '../screens/Home'
import CancelOrderScreen from '../screens/Home/CancelOrder'

const Stack = createStackNavigator()

const {Navigator, Screen} = Stack

export default function ManamentStack(props) {
	return (
		<Navigator initialRouteName={HOME}>
			<Screen
				name={HOME}
				component={HomeScreen}
				options={{
					title: 'Trang chủ'
				}}
			/>
			<Screen
				name={CANCEL_ORDER}
				component={CancelOrderScreen}
				options={{
					title: 'Hủy món ăn',
					headerShown: false
				}}
			/>
		</Navigator>
	)
}
