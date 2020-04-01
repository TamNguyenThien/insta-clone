import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { HOME, POST, PROFILE } from '../constants'
import HomeScreen from '../screens/Home'
import MessageScreen from '../screens/Message'
import PostScreen from '../screens/Post'
import NotificationScreen from '../screens/Notification'
import ProfileScreen from '../screens/Profile'

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
        children={() => <PostScreen {...props} />}
      />
      <Tab.Screen
        name={HOME}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={'home'} color={color} size={size} />
          )
        }}
        children={() => <HomeScreen {...props} />}
      />
      <Tab.Screen
        name='MESSAGE'
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={'comments'} color={color} size={size} />
          )
        }}
        children={() => <MessageScreen {...props} />}
      />
      <Tab.Screen
        name={PROFILE}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={'user'} color={color} size={size} />
          )
        }}
        children={() => <ProfileScreen {...props} />}
      />
      <Tab.Screen
        name='NOTIFICATION'
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={'bell'} color={color} size={size} />
          )
        }}
        children={() => <NotificationScreen {...props} />}
      />
    </Tab.Navigator>
  )
}
