import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {
	ORDER,
	ORDER_DETAIL
} from '../constants/index'
import OrderScreen from '../screens/Order'
import OrderDetailScreen from '../screens/Order/OrderDetail'

const Stack = createStackNavigator()

const {Navigator, Screen} = Stack

export default function ManamentStack(props) {
	return (
		<Navigator initialRouteName={ORDER}>
			<Screen
				name={ORDER}
				component={OrderScreen}
				options={{
					title: 'Đặt Món'
				}}
			/>
			<Screen
				name={ORDER_DETAIL}
				component={OrderDetailScreen}
				options={{
					title: 'Chi tiết Đặt Món'
				}}
			/>
		</Navigator>
	)
}
