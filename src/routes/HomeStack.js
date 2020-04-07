import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HOME } from '../constants'
import HomeScreen from '../screens/Home/Home'
import { Image } from 'react-native'
const Stack = createStackNavigator()
const { Navigator, Screen } = Stack
export default function HomeStack () {
  return (
    <Navigator initialRouteName={HOME}>
      <Screen
        name={HOME}
        component={HomeScreen}
        options={{ title: <Image source={require('../assets/avatar/instagram.png')} /> }}
      />
    </Navigator>
  )
}
