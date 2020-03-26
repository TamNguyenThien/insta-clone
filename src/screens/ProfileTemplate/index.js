import React, {useLayoutEffect} from 'react'
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	FlatList,
	Button
} from 'react-native'
import {useQuery} from '@apollo/react-hooks'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import {
	ADD_PROFILETEMPLATE,
	EDIT_PROFILETEMPLATE,
	DELETE_PROFILETEMPLATE
} from '../../constants'
import {GET_PROFILE_TEMPLATES} from '../../graphql/query'

export default function ProfileTemplateScreen({navigation}) {
	const {data, refetch: refetchProfileTemplate} = useQuery(
		GET_PROFILE_TEMPLATES,
		{
			fetchPolicy: 'network-only'
		}
	)

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{marginRight: 15}}
					onPress={() =>
						navigation.navigate(ADD_PROFILETEMPLATE, {refetchProfileTemplate})
					}>
					<FontAwesome5 name="plus" size={30} />
				</TouchableOpacity>
			)
		})
	}, [navigation])

	return (
		<View style={styles.container}>
			<View style={{marginTop: 10, flex: 1}}>
				<Text style={styles.title}>LIST PROFILE TEMPLATE</Text>
				<FlatList
					keyExtractor={item => item._id}
					data={data ? data.profileTemplates : null}
					renderItem={({item}) => (
						<View style={{position: 'relative'}}>
							<Text style={styles.listNode}>{item.name}</Text>
							<TouchableOpacity
								style={{position: 'absolute', right: 20, top: 8}}
								onPress={() =>
									navigation.navigate(DELETE_PROFILETEMPLATE, {
										item,
										refetchProfileTemplate
									})
								}>
								<FontAwesome5 name={'trash-alt'} size={20} />
							</TouchableOpacity>
							<TouchableOpacity
								style={{position: 'absolute', right: 50, top: 8}}
								onPress={() => {
									navigation.navigate(EDIT_PROFILETEMPLATE, {
										item,
										refetchProfileTemplate
									})
								}}>
								<FontAwesome5 name={'pen'} size={20} />
							</TouchableOpacity>
						</View>
					)}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 20
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
		marginBottom: 10
	},
	listNode: {
		borderWidth: 1,
		fontSize: 20,
		padding: 5,
		borderRadius: 3,
		marginBottom: 10
	}
})
