/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import {NavigationContainer} from '@react-navigation/native'

import AppNavigator from './navigation/AppNavigator'
import ContextProvider from './tools/context'
import ApolloClient from './tools/apollo'

function App() {
	return (
		<ContextProvider>
			<ApolloClient>
				<NavigationContainer>
					<AppNavigator />
				</NavigationContainer>
			</ApolloClient>
		</ContextProvider>
	)
}

export default App
