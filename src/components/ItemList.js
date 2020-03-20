import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default ItemList = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.name}</Text>
      <FontAwesome5 name="arrow-right" size={25} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent:'space-between',
    padding:15,
    alignItems: 'center',
    margin: 10,
    backgroundColor:'#a2e1f2',
    flexDirection:'row'
  },
  title: {
    fontSize: 18
  }
})