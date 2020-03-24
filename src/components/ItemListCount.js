import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

export default ItemListCount = (props) => {
  const [valueCount, setValueCount] = useState('0')
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
    setValueCount(newText)
}
  return (
  <View style={styles.container_dish}>
    <Text style={styles.title}>{props.dish.name}</Text>
    <TextInput
      style={{
        padding: 30,
        backgroundColor:'#81a1d6',
      }}
      keyboardType = 'numeric'
      onChangeText={text => onChanged(text)}
      value={valueCount}
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
    justifyContent:'space-around'
  },
  title: {
    fontSize: 18
  }
})