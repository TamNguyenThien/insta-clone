import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NOTIFICATION } from '../constants'
import NotificationScreen from '../screens/Notification/Notification'
const Stack = createStackNavigator()
const { Navigator, Screen } = Stack
export default function NotificationStack () {
  return (
    <Navigator initialRouteName={NOTIFICATION}>
      <Screen
        name={NOTIFICATION}
        component={NotificationScreen}
        options={{ title: 'Notification' }}
      />
    </Navigator>
  )
}
