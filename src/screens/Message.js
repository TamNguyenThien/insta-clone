import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import ConfirmOrderScreen from "./Order/confirmOrder";

export default function MessageScreen () {
  // return (
  //   <View style={styles.container}>
  //     <Text> Message </Text>
  //   </View>
  // )
  return <ConfirmOrderScreen />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
