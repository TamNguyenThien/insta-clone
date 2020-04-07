import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { POST } from '../constants'
import PostScreen from '../screens/Post/Post'
const Stack = createStackNavigator()
const { Navigator, Screen } = Stack
export default function PostStack () {
  return (
    <Navigator initialRouteName={POST}>
      <Screen
        name={POST}
        component={PostScreen}
        options={{ title: 'Post' }}
      />
    </Navigator>
  )
}
