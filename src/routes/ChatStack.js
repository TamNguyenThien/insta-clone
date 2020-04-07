import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MESSAGE } from '../constants'
import MessageScreen from '../screens/Chat/Message'
const Stack = createStackNavigator()
const { Navigator, Screen } = Stack
export default function ChatStack () {
  return (
    <Navigator initialRouteName={MESSAGE}>
      <Screen
        name={MESSAGE}
        component={MessageScreen}
        options={{ title: 'Message' }}
      />
    </Navigator>
  )
}
