import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {
	PROFILETEMPLATE,
	ADD_PROFILETEMPLATE,
	EDIT_PROFILETEMPLATE,
	DELETE_PROFILETEMPLATE
} from '../constants'

import ProfileTemplateScreen from '../screens/ProfileTemplate'
import AddProfileTemplateScreen from '../screens/ProfileTemplate/addProfileTemplate'
import EditProfileTemplateScreen from '../screens/ProfileTemplate/editProfileTemplate'
import DeleteProfileTemplateScreen from '../screens/ProfileTemplate/deleteProfileTemplate'

const Stack = createStackNavigator()

const {Navigator, Screen} = Stack

export default function ProfileTemplateStack() {
	return (
		<Navigator initialRouteName={PROFILETEMPLATE}>
			<Screen name={PROFILETEMPLATE} component={ProfileTemplateScreen} />
			<Screen
				name={ADD_PROFILETEMPLATE}
				component={AddProfileTemplateScreen}
				options={{headerShown: false}}
			/>
			<Screen
				name={EDIT_PROFILETEMPLATE}
				component={EditProfileTemplateScreen}
				options={{headerShown: false}}
			/>
			<Screen
				name={DELETE_PROFILETEMPLATE}
				component={DeleteProfileTemplateScreen}
				options={{headerShown: false}}
			/>
		</Navigator>
	)
}
