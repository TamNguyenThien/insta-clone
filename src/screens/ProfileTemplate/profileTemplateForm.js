import React, {useState, useEffect} from 'react'
import {
	Text,
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
	Picker
} from 'react-native'
import {Formik} from 'formik'
import * as yup from 'yup'
import {useQuery} from '@apollo/react-hooks'

import {GET_ROLES, GET_NODES} from '../../graphql/query'

const reviewSchema = yup.object({
	name: yup.string().required('Name is required')
})

export default function ProfileTemplateForm({
	title,
	handleSubmit,
	handleCancel,
	item
}) {
	const [role, setRole] = useState(item.role)
	const [node, setNode] = useState(item.node)
	const {data: dataNodes} = useQuery(GET_NODES)
	const {data: dataRoles} = useQuery(GET_ROLES)
	console.log(item)
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<ScrollView>
				<View style={styles.container}>
					<Text style={styles.title}>{title}</Text>
					<Formik
						validationSchema={reviewSchema}
						initialValues={item}
						onSubmit={values => {
							handleSubmit(values, role, node)
						}}>
						{props => (
							<View>
								<TextInput
									style={styles.input}
									placeholder="Name"
									onChangeText={props.handleChange('name')}
									value={props.values.name}
									onBlur={props.handleBlur('name')}
								/>
								<Text style={styles.errorText}>
									{props.touched.name && props.errors.name}
								</Text>

								<View style={styles.picker}>
									<Picker
										selectedValue={node}
										onValueChange={itemValue => setNode(itemValue)}>
										{dataNodes &&
											dataNodes.nodes.map(val => (
												<Picker.Item
													label={val.name}
													value={val._id}
													key={val._id}
												/>
											))}
									</Picker>
								</View>

								<View style={styles.picker}>
									<Picker
										selectedValue={role}
										onValueChange={itemValue => setRole(itemValue)}>
										{dataRoles &&
											dataRoles.roles.map(val => (
												<Picker.Item
													label={val.code}
													value={val._id}
													key={val._id}
												/>
											))}
									</Picker>
								</View>
								<TouchableOpacity
									onPress={props.handleSubmit}
									style={{marginTop: 20}}>
									<View style={styles.button}>
										<Text style={styles.buttonText}>OK</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									style={{marginTop: 10}}
									onPress={handleCancel}>
									<View style={styles.button}>
										<Text style={styles.buttonText}>Cancel</Text>
									</View>
								</TouchableOpacity>
							</View>
						)}
					</Formik>
				</View>
			</ScrollView>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff'
	},
	title: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 15
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		padding: 10,
		fontSize: 18,
		borderRadius: 6
	},
	errorText: {
		color: 'crimson',
		fontWeight: 'bold',
		marginBottom: 10,
		marginTop: 6,
		textAlign: 'center'
	},
	button: {
		borderRadius: 8,
		paddingVertical: 14,
		paddingHorizontal: 10,
		backgroundColor: '#f01d71'
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		fontSize: 16,
		textAlign: 'center'
	},
	picker: {
		borderWidth: 1,
		borderColor: '#ddd',
		marginBottom: 20,
		borderRadius: 6
	}
})
