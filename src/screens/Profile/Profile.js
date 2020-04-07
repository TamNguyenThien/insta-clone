import React, { useContext, useEffect, useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  ScrollView
} from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import * as yup from 'yup'

import { CTX } from '../../tools/context'
import { GET_INFO_PROFILE, CHANGE_PASSWORD } from '../../graphql'

const reviewSchema = yup.object({
  currentpassword: yup.string().required('current password is required'),
  newpassword: yup.string().required('new password is required'),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref('newpassword'), null], 'Passwords must match')
})

export default function ProfileScreen () {
  const [user, setUser] = useState(null)
  const { data: dataProfile } = useQuery(GET_INFO_PROFILE)
  const [changePassword] = useMutation(CHANGE_PASSWORD)
  const [modal, setModal] = useState(false)

  const authContext = useContext(CTX)
  const { _logout } = authContext

  function _onLogout () {
    // NOTE: context
    _logout()
  }
  console.log(dataProfile)
  const handleChangePassword = values => {
    const { currentpassword, newpassword } = values
    changePassword({
      variables: {
        id: dataProfile.me._id,
        currentpassword,
        newpassword
      }
    })
      .then(res => {
        if (res.errors) {
          console.log({ err: res.errors, title: 'change password user failed!' })
        } else {
          setModal(false)
          console.log({ title: 'change password user success' })
        }
      })
      .catch(err => {
        console.log({ err, title: 'change password user failed!!!!!' })
      })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={_onLogout}>
        <Text>Log out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModal(true)}>
        <Text>Change password</Text>
      </TouchableOpacity>

      <Modal transparent visible={modal}>
        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
          <ScrollView>
            <View
              style={{
                backgroundColor: '#ffffff',
                margin: 60,
                padding: 50,
                borderRadius: 10,
                flex: 1
              }}>
              <Text
                style={{ fontSize: 22, textAlign: 'center', marginBottom: 10 }}>
								Change password
              </Text>
              <Formik
                validationSchema={reviewSchema}
                initialValues={{
                  currentpassword: '',
                  newpassword: '',
                  confirmpassword: ''
                }}
                onSubmit={values => {
                  // handleLockUnlockUser(values.reason)
                  handleChangePassword(values)
                }}>
                {props => (
                  <View>
                    <TextInput
                      secureTextEntry
                      style={styles.input}
                      placeholder='Current password'
                      onChangeText={props.handleChange('currentpassword')}
                      value={props.values.currentpassword}
                      onBlur={props.handleBlur('currentpassword')}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.currentpassword &&
												props.errors.currentpassword}
                    </Text>
                    <TextInput
                      secureTextEntry
                      style={styles.input}
                      placeholder='New password'
                      onChangeText={props.handleChange('newpassword')}
                      value={props.values.newpassword}
                      onBlur={props.handleBlur('newpassword')}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.newpassword && props.errors.newpassword}
                    </Text>
                    <TextInput
                      secureTextEntry
                      style={styles.input}
                      placeholder='Confirm password'
                      onChangeText={props.handleChange('confirmpassword')}
                      value={props.values.confirmpassword}
                      onBlur={props.handleBlur('confirmpassword')}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.confirmpassword &&
												props.errors.confirmpassword}
                    </Text>

                    <TouchableOpacity onPress={props.handleSubmit}>
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>OK</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginTop: 10 }}
                      onPress={() => setModal(false)}>
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>Cancel</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </View>
      </Modal>
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
