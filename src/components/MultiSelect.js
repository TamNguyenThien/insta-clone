import React, {useState} from 'react'
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Modal,
	Button,
	FlatList
} from 'react-native'

export default function MultiSelect({items, handleSelected, handleSubmit}) {
	const [modal, setModal] = useState(false)

	return (
		<View style={styles.container}>
			<View style={styles.select}>
				<TouchableOpacity onPress={() => setModal(true)}>
					<Text>
						Select permissions: {items.filter(i => i.isSelected).length}
					</Text>
				</TouchableOpacity>
			</View>

			<Modal transparent visible={modal}>
				<View style={{backgroundColor: '#000000aa', flex: 1}}>
					<View
						style={{
							backgroundColor: '#fff',
							margin: 60,
							padding: 50,
							borderRadius: 10,
							flex: 1
						}}>
						<Text style={styles.title}>PERMISSIONS</Text>
						<FlatList
							keyExtractor={item => item.name}
							data={items}
							renderItem={({item}) => (
								<View style={styles.item}>
									<TouchableOpacity onPress={() => handleSelected(item)}>
										<Text style={item.isSelected ? styles.selected : null}>
											{item.name}
										</Text>
									</TouchableOpacity>
								</View>
							)}
						/>
						<View style={styles.btn}>
							<Button
								title="OK"
								onPress={() => {
									handleSubmit()
									setModal(false)
								}}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginBottom: 10
	},
	select: {
		borderWidth: 1,
		borderColor: '#ddd',
		padding: 10,
		fontSize: 18,
		borderRadius: 6
	},
	btn: {
		marginTop: 20
	},
	title: {
		fontSize: 20,
		marginBottom: 5,
		fontWeight: 'bold'
	},
	item: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		marginTop: 10
	},
	selected: {
		backgroundColor: '#ccc'
	}
})
