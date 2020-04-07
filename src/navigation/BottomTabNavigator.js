import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { HOME, POST, PROFILE } from '../constants'
import HomeStack from '../routes/HomeStack'
import PostStack from '../routes/PostStack'
import ChatStack from '../routes/ChatStack'
import ProfileStack from '../routes/ProfileStack'
import NotificationStack from '../routes/NotificationStack'

const Tab = createBottomTabNavigator()

export default function BottomTabNavigator (props) {
  return (
    <Tab.Navigator
      initialRouteName={HOME}
      tabBarOptions={{
        activeTintColor: '#161F3D',
        showLabel: false
      }}>
      <Tab.Screen
        name={POST}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={'plus-circle'} color={color} size={size} />
          )
        }}
        children={props => <PostStack {...props} />}
      />
      
      <Tab.Screen
        name='CHAT'
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={'comments'} color={color} size={size} />
          )
        }}
        children={props => <ChatStack {...props} />}
      />
      <Tab.Screen
        name={HOME}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={'home'} color={color} size={size} />
          )
        }}
        children={props => <HomeStack {...props} />}
      />
      <Tab.Screen
        name={PROFILE}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={'user'} color={color} size={size} />
          )
        }}
        children={props => <ProfileStack {...props} />}
      />
      <Tab.Screen
        name='NOTIFICATION'
        headerMode='none'
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={'bell'} color={color} size={size} />
          )
        }}
        children={props => <NotificationStack {...props} />}
      />
    </Tab.Navigator>
  )
}
