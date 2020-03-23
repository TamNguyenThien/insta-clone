import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Modal, Button, Picker } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { FlatList } from 'react-native-gesture-handler'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { REPORT_ORDER, ORDER_FOR_USER, MENU_PUBLISH } from '../graphql/query'
import { CREATE_ORDER_FOR_USER } from '../graphql/mutation'

export default function ReportScreen () {
  const [valueDish, setValueDish] = useState('')
  const [valueUser, setValueUser] = useState('')
  const { data: dataReport } = useQuery(REPORT_ORDER) // query data report
  const { data: dataUser } = useQuery(ORDER_FOR_USER) // query user for order
  const { data: MenuPublish } = useQuery(MENU_PUBLISH) // query menu for order
  const [createOrder] = useMutation(CREATE_ORDER_FOR_USER)
  const [openModalOrder, setOpenModalOrder] = useState(false)
  const [idDish, setIdDish] = useState('')
  const [idUser, setIdUser] = useState('')
  const idMenu = MenuPublish ? MenuPublish.menuPublished._id : null // take idMenu for create
  const onChangeDish = (itemValue) => { // take idDish for create
    const dishName = MenuPublish.menuPublished.dishes.find(i => i._id === itemValue)
    setIdDish(dishName._id)
  }
  const onChangeUser = (itemValue) => { // take idUser for create
    const userName = dataUser.users.find(i => i._id === itemValue)
    setIdUser(userName._id)
  }
  return (
    <View style={styles.container}>
      <Modal transparent visible={openModalOrder}>
        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
          <View style={styles.viewModal}>
            <Text>Order for User</Text>
            <Picker selectedValue={valueUser}
              onValueChange={(itemValue, itemIndex) => { setValueUser(itemValue); onChangeUser(itemValue) }}>
              { dataUser ? dataUser.users.map((item) => (
                <Picker.Item key={item._id} label={item.fullName} value={item._id} />
              )) : null}
            </Picker>

            <Picker
              selectedValue={valueDish}
              onValueChange={(itemValue, itemIndex) => { setValueDish(itemValue); onChangeDish(itemValue) }}>
              {MenuPublish ? MenuPublish.menuPublished.dishes.map((item) => (
                <Picker.Item key={item._id} label={item.name} value={item._id} />
              )) : null}
            </Picker>
            <Button title='Order' onPress={() => { createOrder({ variables: { input: { idMenu, idDish, idUser } } }); setOpenModalOrder(false) }} />
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <FontAwesome5 name={'envelope'} size={30} />
        <Text style={styles.text}>BÁO CÁO</Text>
        <View style={{ flexDirection: 'row', marginLeft: 80 }}>
          <TouchableOpacity style={{ marginRight: 20 }}>
            <FontAwesome5 name={'lock'} size={28} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 20 }}>
            <FontAwesome5 name={'times-circle'} size={28} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 20 }}>
            <FontAwesome5 name={'download'} size={28} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 20 }}>
            <FontAwesome5 name={'cart-arrow-down'} size={28} onPress={() => setOpenModalOrder(true)} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ margin: 20, borderWidth: 1, borderRadius: 3 }}>
        <Picker>
          <Picker.Item label='Phòng công nghệ' />
          <Picker.Item label='DN' />
          <Picker.Item label='NT' />
        </Picker>
      </View>
      <View>
        <View style={{ flexDirection: 'row', position: 'relative', marginBottom: 20 }}>
          <Text>STT</Text>
          <Text style={{ position: 'absolute', left: 90, fontSize: 20 }}>Món ăn</Text>
          <Text style={{ position: 'absolute', left: 250, fontSize: 20 }}>Ordered</Text>
          <Text style={{ position: 'absolute', right: 10, fontSize: 20 }}>Total</Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={dataReport ? dataReport.reportOrder.dishes : null}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'row', position: 'relative', fontSize: 18 }}>
              <Text style={{ fontSize: 16 }}>{index + 1}</Text>
              <Text style={{ position: 'absolute', left: 70, fontSize: 16 }}>{item.name}</Text>
              <Text style={{ position: 'absolute', left: 280, fontSize: 16 }}>{item.count}</Text>
              <Text style={{ position: 'absolute', right: 10, fontSize: 16 }}>10</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 2,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    height: 45,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewModal: {
    backgroundColor: '#ffffff',
    margin: 60,
    padding: 50,
    borderRadius: 10,
    flex: 1
  },
  text: { 
    fontSize: 20,
     marginLeft: 10,
      justifyContent: 'center',
       alignItems: 'center'
       }
})
