import React, {useEffect, useState} from 'react'
import {Text, StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView, Picker} from 'react-native'
import {ORDER} from '../../constants'
import Loading from '../../components/Loading'
import { useQuery } from '@apollo/react-hooks'
import { GET_MENU_PUBLISHED_BY_NODE, GET_NODES, CURRENT_USER_ORDER } from '../../graphql'

export default function OrderScreen({navigation}) {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Bạn chưa đặt cơm</Text>
      <View style={styles.content}>
        <Text>Thời gian còn lại để đặt cơm: </Text>
      </View>
      <TouchableOpacity 
        style={styles.submit}
        onPress={() => navigation.navigate(ORDER)}
      >
        <View>
          <Text>Đặt cơm ngay</Text>
        </View>
      </TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 25, 
		textAlign:'center',
		color: '#d1326a',
		marginTop:10
	},
	container: {
    margin:10,
    borderColor: '#bf6363',
    borderWidth:1,
    justifyContent:'space-around',
    alignItems:'center',
    height:"60%"
  },
  content: {
    fontSize: 17
  },
  submit: {
    borderColor:'red',
    padding: 40,
    borderWidth: 1
  }
	
})
