import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

<<<<<<< HEAD
import {HOME, MESSAGE, POST, NOTIFICATION, PROFILE, MANAMENT, MENU} from '../constants'
=======
import {
	HOME,
	MESSAGE,
	POST,
	NOTIFICATION,
	PROFILE,
	MENU,
	USER
} from '../constants'
>>>>>>> 66cdc384e68cabfb4cf5f0eee9be4c6bad5992a5
import HomeScreen from '../screens/Home'
import MessageScreen from '../screens/Message'
import PostScreen from '../screens/Post'
import NotificationScreen from '../screens/Notification'
import ProfileScreen from '../screens/Profile'
import MenuStack from '../routes/MenuStack'
<<<<<<< HEAD
import ManamentStack from '../routes/ManamentStack'
=======
import UserStack from '../routes/UserStack'
>>>>>>> 66cdc384e68cabfb4cf5f0eee9be4c6bad5992a5

const Tab = createBottomTabNavigator()

export default function BottomTabNavigator(props) {
	return (
		<Tab.Navigator
			initialRouteName={HOME}
			tabBarOptions={{
				activeTintColor: '#161F3D',
				showLabel: false
			}}>
			<Tab.Screen
				name={HOME}
				options={{
					tabBarIcon: ({color, size}) => (
						<FontAwesome5 name={'home'} color={color} size={size} />
					)
				}}
				children={() => <HomeScreen {...props} />}
			/>
			<Tab.Screen
				name={MENU}
				options={{
					tabBarIcon: ({color, size}) => (
						<FontAwesome5 name={'bars'} color={color} size={size} />
					)
				}}
				children={() => <MenuStack {...props} />}
			/>
			<Tab.Screen
				name={USER}
				options={{
					tabBarIcon: ({color, size}) => (
						<FontAwesome5 name={'user-friends'} color={color} size={size} />
					)
				}}
				children={() => <UserStack {...props} />}
			/>
			<Tab.Screen
				name={MESSAGE}
				options={{
					tabBarIcon: ({color, size}) => (
						<FontAwesome5 name={'comments'} color={color} size={size} />
					)
				}}
				children={() => <MessageScreen {...props} />}
			/>
			<Tab.Screen
				name={POST}
				options={{
					tabBarIcon: ({color, size}) => (
						<FontAwesome5 name={'plus-circle'} color={color} size={size} />
					)
				}}
				children={() => <PostScreen {...props} />}
			/>
			<Tab.Screen
				name={NOTIFICATION}
				options={{
					tabBarIcon: ({color, size}) => (
						<FontAwesome5 name={'bell'} color={color} size={size} />
					)
				}}
				children={() => <NotificationScreen {...props} />}
			/>
			<Tab.Screen
				name={PROFILE}
				options={{
					tabBarIcon: ({color, size}) => (
						<FontAwesome5 name={'user'} color={color} size={size} />
					)
				}}
				children={props => <ProfileScreen {...props} />}
			/>
			<Tab.Screen
				name={MANAMENT}
				options={{
					tabBarIcon: ({color, size}) => (
						<FontAwesome5 name={'folder'} color={color} size={size} />
					)
				}}
				children={props => <ManamentStack {...props} />}
			/>
		</Tab.Navigator>
	)
}
