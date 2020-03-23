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
	Button
} from 'react-native'
import {Formik} from 'formik'
import * as yup from 'yup'

import MultiSelect from '../../components/MultiSelect'
import {PERMISSIONS} from '../../constants/permissions'

const reviewSchema = yup.object({
	code: yup.string().required('Code is required'),
	description: yup.string()
})

export default function RoleForm({
	title,
	handleSubmit,
	handleCancel,
	isEditForm,
	item
}) {
	const [list, setList] = useState([])

	useEffect(() => {
		const initList = PERMISSIONS.map(i =>
			item.permissions.includes(i.name)
				? {...i, isSelected: true}
				: {...i, isSelected: false}
		)
		setList(initList)
	}, [PERMISSIONS, item])

	const handleSelected = item => {
		const newList = list.map(i =>
			i.name === item.name ? {...i, isSelected: !i.isSelected} : i
		)
		setList(newList)
	}

	const handleSubmitSelected = () => {
		console.log(list.filter(i => i.isSelected))
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<ScrollView>
				<View style={styles.container}>
					<Text style={styles.title}>{title}</Text>
					<Formik
						validationSchema={reviewSchema}
						initialValues={item}
						onSubmit={values => {
							const per = list.filter(i => i.isSelected).map(i => i.name)
							if (per.length > 0) {
								handleSubmit(values, per)
							}
							// console.log(per)
						}}>
						{props => (
							<View>
								<TextInput
									style={styles.input}
									placeholder="Code"
									onChangeText={props.handleChange('code')}
									value={props.values.code}
									onBlur={props.handleBlur('code')}
								/>
								<Text style={styles.errorText}>
									{props.touched.code && props.errors.code}
								</Text>
								<TextInput
									multiline
									style={styles.input}
									placeholder="Description"
									onChangeText={props.handleChange('description')}
									value={props.values.description}
									onBlur={props.handleBlur('description')}
								/>
								<Text style={styles.errorText}>
									{props.touched.description && props.errors.description}
								</Text>
								<MultiSelect
									items={list}
									handleSelected={handleSelected}
									handleSubmit={handleSubmitSelected}
								/>
								{list.filter(i => i.isSelected).length === 0 && (
									<Text style={styles.errorText}>
										PERMISSIONS required more than 0 item
									</Text>
								)}
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
	}
})
