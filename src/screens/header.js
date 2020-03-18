import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
export default function Header () {
  return (
    <View style={styles.header}>
      <FontAwesome5 name='plus' size={18} backgroundColor='#F8F8F8' style={{ marginLeft: 280 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  headerText: {
    justifyContent: 'center',
    flex: 1,
    width: 200,
    textAlign: 'center',
    marginLeft: 50,
    flexDirection: 'row',
    borderWidth: 1,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1
  }
})
