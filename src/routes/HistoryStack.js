import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {HISTORY, HISTORY_BY_USER, HISTORY_BY_ORDER} from '../constants/index'
import HistoryScreen from '../screens/History'
import HistoryByUserScreen from '../screens/History/historyByUser'
import HistoryByOrderScreen from '../screens/History/historyByOrder'

const Stack = createStackNavigator()

const {Navigator, Screen} = Stack

export default function HistoryStack() {
	return (
		<Navigator>
			<Screen name={HISTORY} component={HistoryScreen} />
			<Screen name={HISTORY_BY_USER} component={HistoryByUserScreen} />
			<Screen name={HISTORY_BY_ORDER} component={HistoryByOrderScreen} />
		</Navigator>
	)
}
