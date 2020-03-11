import * as Yup from 'yup'

const username = Yup.string().required('Username is required')

const password = Yup.string()
	.min(2, 'Password too Short!')
	.max(50, 'Password too Long!')
	.required('Password is required')

const LoginSchema = Yup.object().shape({
	username,
	password
})

export default LoginSchema
