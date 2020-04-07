import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { PROFILE } from '../constants'
import HomeScreen from '../screens/Home/Home'
const Stack = createStackNavigator()
const { Navigator, Screen } = Stack
export default function ProfileStack () {
  return (
    <Navigator initialRouteName={PROFILE}>
      <Screen
        name={PROFILE}
        component={HomeScreen}
        options={{ title: 'Profile' }}
      />
    </Navigator>
  )
}
