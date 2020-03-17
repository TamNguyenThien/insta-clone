import React, { useState } from 'react'
import { Text, StyleSheet, View, Modal, TouchableOpacity, Picker, Item, Button } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_NODES } from '../graphql/query'
import { CREATE_NODE, UPDATE_NODE, DELETE_NODE } from '../graphql/mutation'
export default function NodeScreen ({ navigation }) {
  const [openModal, setOpenModal] = useState(false)
  const [openModalUpd, setOpenModalUpd] = useState(false)
  const [isFeet, setIsFeet] = useState(false)
  const [idUpd, setIdUpd] = useState('')
  const [name, setName] = useState('')
  const { loading, error, data } = useQuery(GET_NODES)
  const [createNode] = useMutation(CREATE_NODE)
  const [deleteNode] = useMutation(DELETE_NODE)
  const [updateNode] = useMutation(UPDATE_NODE)

  return (
    <View style={styles.container}>
      <View style={{ position: 'relative', marginBottom: 50 }}>
        <TouchableOpacity style={{ position: 'absolute' }} onPress={() => navigation.goBack()}>
          <FontAwesome5 name={'chevron-left'} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={() => setOpenModal(true)}>
          <FontAwesome5 name={'plus'} size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <TextInput placeholder='Search' style={{ borderWidth: 1, borderRadius: 3, height: 40, padding: 10 }} />
        <View style={{ borderWidth: 1, marginTop: 10, borderRadius: 3 }}>
          <Picker>
            <Picker.Item label='HCM' />
            <Picker.Item label='DN' />
            <Picker.Item label='NT' />
          </Picker>
        </View>
      </View>
      <View style={{ marginTop: 60 }} >
        <Text>LIST NODES</Text>
        <FlatList extraData={isFeet} onRefresh={data} keyExtractor={(item, index) => index.toString()} data={data ? data.nodes : null} renderItem={({ item }) => (
          <View style={{ position: 'relative' }}>
            <Text key={Math.random().toString()} style={styles.listNode}>{item.name}</Text>
            <TouchableOpacity style={{ position: 'absolute', right: 20, top: 8 }} onPress={() => deleteNode({ variables: { _id: `${item._id}` } })}>
              <FontAwesome5 name={'trash-alt'} size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={{ position: 'absolute', right: 50, top: 8 }} onPress={() => { setOpenModalUpd(true); setName(item.name); setIdUpd(item._id) }}>
              <FontAwesome5 name={'pen'} size={20} />
            </TouchableOpacity>
          </View>
        )} />
      </View>
      <Modal transparent visible={openModal}>
        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
          <View style={{ backgroundColor: '#ffffff', margin: 60, padding: 50, borderRadius: 10, flex: 1 }}>
            <TouchableOpacity onPress={() => setOpenModal(false)}>
              <FontAwesome5 name={'times'} size={20} />
            </TouchableOpacity>
            <Text style={{ fontSize: 22, textAlign: 'center' }}>Add node</Text>
            <TextInput placeholder='Add node' style={{ borderWidth: 1, borderRadius: 3, height: 40, marginBottom: 20 }} onChangeText={(value) => setName(value)} />
            <Button title='Add' onPress={() => { createNode({ variables: { input: { name } } }); setOpenModal(false) }} />
          </View>
        </View>
      </Modal>
      <Modal transparent visible={openModalUpd}>
        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
          <View style={{ backgroundColor: '#ffffff', margin: 60, padding: 50, borderRadius: 10, flex: 1 }}>
            <TouchableOpacity onPress={() => setOpenModalUpd(false)}>
              <FontAwesome5 name={'times'} size={20} />
            </TouchableOpacity>
            <Text style={{ fontSize: 22, textAlign: 'center' }}>Update node</Text>
            <TextInput value={name} style={{ borderWidth: 1, borderRadius: 3, height: 40, marginBottom: 20 }} onChangeText={(value) => setName(value) } />
            <Button title='Update' onPress={() => { updateNode({ variables: { _id: idUpd, input: { name } } }); setOpenModalUpd(false) }} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  listNode: {
    borderWidth: 1,
    fontSize: 20,
    padding: 5,
    borderRadius: 3,
    marginBottom: 10
  }
})
