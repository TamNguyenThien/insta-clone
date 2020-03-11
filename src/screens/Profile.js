import React, {useContext, useEffect, useState} from 'react'
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native'

import {CTX} from '../tools/context'

export default function ProfileScreen() {
	const [user, setUser] = useState(null)

	const authContext = useContext(CTX)
	const {_logout} = authContext

	function _onLogout() {
		// NOTE: context
		_logout()
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={_onLogout}>
				<Text>Log out</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	avatarContainer: {
		shadowColor: '#151734',
		shadowRadius: 30,
		shadowOpacity: 0.4
	},
	avatarPlaceholder: {
		width: 100,
		height: 100,
		backgroundColor: '#E1E2E6',
		borderRadius: 50,
		marginTop: 48,
		justifyContent: 'center',
		alignItems: 'center'
	},
	avatar: {
		position: 'absolute',
		width: 100,
		height: 100,
		borderRadius: 50
	},
	name: {
		marginTop: 24,
		fontSize: 16,
		fontWeight: '600'
	},
	statsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 32
	},
	stat: {
		alignItems: 'center',
		flex: 1
	},
	statAmount: {
		color: '#4F566D',
		fontSize: 18,
		fontWeight: '300'
	},
	statTitle: {
		color: '#C3C5CD',
		fontSize: 12,
		fontWeight: '500',
		marginTop: 4
	}
})
