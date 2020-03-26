import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

export default ItemListCount = (props) => {
  const onChanged = (text) => {
    let newText = ''
    let numbers = '0123456789'

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i]
        }
        else {
            alert("please enter numbers only")
        }
    }
    props.onChange({
      _id: props.dish._id,
      count: +text
    })
}
  return (
  <View style={styles.container_dish}>
    <Text style={styles.title}>{props.dish.name}</Text>
    <TextInput
      style={{
        padding: 25,
        backgroundColor:'#81a1d6',
        fontSize: 16,
        width: 100,
        textAlign: 'center'
      }}
      keyboardType = 'numeric'
      placeholder = {props.dataCountDishByMenu.toString()}
      onChangeText={text => onChanged(text)}
      value={props.dish.count}
    />
  </View>
  )
}

const styles = StyleSheet.create({
  container_dish: {
    height: 100,
    padding:15,
    alignItems: 'center',
    margin: 10,
    backgroundColor:'#a2e1f2',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  title: {
    fontSize: 18
  }
})