import React, {useLayoutEffect, useState, useEffect} from 'react'
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	FlatList,
	Picker,
} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {useQuery} from '@apollo/react-hooks'

import {ADD_MENU, MENU_DETAIL} from '../../constants'
import {GET_MENUS_BY_NODE, GET_NODES} from '../../graphql/query'

export default function MenuScreen({navigation}) {
	const [node, setNode] = useState('')
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{marginRight: 15}}
					onPress={() => navigation.navigate(ADD_MENU, {refetchMenu, node})}>
					<FontAwesome5 name="plus" size={30} />
				</TouchableOpacity>
			)
		})
	}, [navigation, node])

	const {data: dataNode} = useQuery(GET_NODES)
	const {data: dataMenu, refetch: refetchMenu} = useQuery(GET_MENUS_BY_NODE, {
		variables: {idNode: node},
		fetchPolicy: 'network-only'
	})

	return (
		<View style={styles.container}>
			<Picker
				selectedValue={node}
				style={{height: 50, width: '50%'}}
				onValueChange={itemValue => setNode(itemValue)}>
				{dataNode &&
					dataNode.nodes.map(val => (
						<Picker.Item label={val.name} value={val._id} key={val._id} />
					))}
			</Picker>
			<View
				style={{borderWidth: 2, borderColor: '#999', width: '98%', flex: 1}}>
				<View style={styles.content}>
					<Text style={{...styles.header, ...styles.name}}>Menu name</Text>
					<Text style={{...styles.header, ...styles.isPublished}}>
						isPublished
					</Text>
				</View>
				<View style={{flex: 1}}>
					<FlatList
						keyExtractor={item => item._id}
						data={dataMenu ? dataMenu.menusByNode : []}
						renderItem={({item}) => (
							<View>
								{item.isActive && (
									<TouchableOpacity
										style={styles.content}
										onPress={() =>
											navigation.navigate(MENU_DETAIL, {item, refetchMenu})
										}>
										<Text style={{...styles.name, ...styles.item}}>
											{item.name}
										</Text>
										<View style={{...styles.isPublished, ...styles.item}}>
											{item.isPublished ? (
												<FontAwesome5 name="check" size={30} />
											) : null}
										</View>
									</TouchableOpacity>
								)}
							</View>
						)}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	header: {
		fontSize: 25,
		fontWeight: 'bold'
	},
	content: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		margin: 5
	},
	item: {
		fontSize: 20
	},
	name: {
		marginLeft: 10,
		marginRight: 'auto'
	},
	isPublished: {
		marginLeft: 'auto',
		marginRight: 10
	}
})
