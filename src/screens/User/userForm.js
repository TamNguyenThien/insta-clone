import React from 'react'
import {Text, StyleSheet, TextInput, View, TouchableOpacity} from 'react-native'
import {Formik} from 'formik'
import * as yup from 'yup'

const reviewSchema = yup.object({
	username: yup.string().required('username is required'),
	fullName: yup.string().required('Full name is required'),
	password: yup.string().required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
})

export default function UserForm({
	title,
	handleSubmit,
	handleCancel,
	isEditForm,
	item
}) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Formik
				validationSchema={reviewSchema}
				initialValues={item}
				onSubmit={values => {
					handleSubmit(values)
				}}>
				{props => (
					<View>
						{isEditForm ? (
							<Text style={styles.input}>{item.username}</Text>
						) : (
							<TextInput
								style={styles.input}
								placeholder="Username"
								onChangeText={props.handleChange('username')}
								value={props.values.username}
								onBlur={props.handleBlur('username')}
							/>
						)}
						<Text style={styles.errorText}>
							{props.touched.username && props.errors.username}
						</Text>
						<TextInput
							style={styles.input}
							placeholder="Full name"
							onChangeText={props.handleChange('fullName')}
							value={props.values.fullName}
							onBlur={props.handleBlur('fullName')}
						/>
						<Text style={styles.errorText}>
							{props.touched.fullName && props.errors.fullName}
						</Text>
						<TextInput
							style={styles.input}
							placeholder="Password"
							secureTextEntry={true}
							onChangeText={props.handleChange('password')}
							value={props.values.password}
							onBlur={props.handleBlur('password')}
						/>
						<Text style={styles.errorText}>
							{props.touched.password && props.errors.password}
						</Text>
						<TextInput
							style={styles.input}
							placeholder="Confirm password"
							secureTextEntry={true}
							onChangeText={props.handleChange('confirmPassword')}
							value={props.values.confirmPassword}
							onBlur={props.handleBlur('confirmPassword')}
						/>
						<Text style={styles.errorText}>
							{props.touched.confirmPassword && props.errors.confirmPassword}
						</Text>
						<TouchableOpacity onPress={props.handleSubmit}>
							<View style={styles.button}>
								<Text style={styles.buttonText}>OK</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={{marginTop: 10}} onPress={handleCancel}>
							<View style={styles.button}>
								<Text style={styles.buttonText}>Cancel</Text>
							</View>
						</TouchableOpacity>
					</View>
				)}
			</Formik>
		</View>
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
