import React, { useState } from 'react'
import { Text, StyleSheet, View, Button, Modal, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function HomeScreen ({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <View style={{ position: 'relative', marginTop: 100 }}>
        <Text style={{ position: 'absolute', fontSize: 20 }}>Nodes </Text>
        <TouchableOpacity style={{ position: 'absolute', right: 2 }} onPress={() => navigation.navigate('detailNode')}>
          <FontAwesome5 name={'chevron-right'} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10

    // alignItems: 'center',
    // justifyContent: 'center'
  }
})
