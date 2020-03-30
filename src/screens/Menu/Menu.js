import React, {useState, useEffect} from 'react'
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
import {GET_MENUS_BY_NODE, GET_NODES, SHOPS} from '../../graphql/query'

export default function MenuScreen({navigation}) {
	const [node, setNode] = useState('')
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{marginRight: 15}}
					onPress={() => navigation.navigate(ADD_MENU, {refetchMenu, node})}>
					<FontAwesome5 name="plus" size={30} />
				</TouchableOpacity>
			)
		})
	const {data: dataShop} = useQuery(SHOPS)
	const {data: dataNode} = useQuery(GET_NODES)
	const {loading, data: dataMenu, refetch: refetchMenu} = useQuery(GET_MENUS_BY_NODE, {
		variables: {idNode: node}
	})

	return (
		<View style={styles.container}>
			<Picker
				selectedValue={node}
				style={{ width: '50%'}}
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
					{
						!loading && dataMenu.menusByNode.map((item,idx) => 
							<View key={idx}>
								{item.isActive && (
									<TouchableOpacity
										style={styles.content}
										onPress={() =>
											{
												if(dataShop.shops.length === 0) {
													return alert('Chưa có Quán Ăn\nVui lòng thêm Quán ăn')
												}
												return navigation.navigate(MENU_DETAIL, {refetchMenu, dataShop, item, dataMenu, node})
											}
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
						)
					}
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
