import React, { useEffect, useState, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {SPLASH, ONBOARDING, AUTH, BOTTOM_TAB, SHOP, ROLE, NODE} from '../constants'
import SplashScreen from '../screens/Splash'
import OnBoardingScreen from '../screens/OnBoarding'
import AuthStackNavigator from './AuthNavigator'
import BottomTabNavigator from './BottomTabNavigator'
import ShopScreen from '../screens/Shop'
import RoleScreen from '../screens/Role'
import NodeScreen from '../screens/Node'
import Node from '../screens/Node'

import {CTX} from '../tools/context'

const Stack = createStackNavigator()

export default function AppStackNavigator () {
  const [loading, setLoading] = useState(true)

  const context = useContext(CTX)
  const { skip, token } = context

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  })

	return (
		<Stack.Navigator
			initialRouteName={SPLASH}
			headerMode="none"
			screenOptions={{
				animationTypeForReplace: 'push'
			}}>
			{loading ? (
				<Stack.Screen name={SPLASH} component={SplashScreen} />
			) : !skip ? (
				<Stack.Screen name={ONBOARDING} component={OnBoardingScreen} />
			) : !token ? (
				<Stack.Screen name={AUTH} component={AuthStackNavigator} />
			) : (	
				<>
					<Stack.Screen name={BOTTOM_TAB} component={BottomTabNavigator} />
					<Stack.Screen 
						name={SHOP}
						component={ShopScreen}
						options={{title: 'Shop'}}
					/>
					<Stack.Screen 
						name={ROLE}
						component={RoleScreen}
						options={{title: 'Role'}}
					/>
					<Stack.Screen 
						name={NODE}
						component={NodeScreen}
						options={{title: 'Node'}}
					/>
					<Stack.Screen 
						name='detailNode' 
						component={Node} 
					/>
				</>
			)}
		</Stack.Navigator>
	)
}
