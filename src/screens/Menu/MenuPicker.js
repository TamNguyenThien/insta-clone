import React, {useState, useEffect} from 'react'
import {Text, StyleSheet, SafeAreaView, Picker, View, TextInput} from 'react-native'
import {useQuery} from '@apollo/react-hooks'
import {DISHES_BY_SHOP, DISH_SHOP} from '../../graphql'
import Loading from '../../components/Loading'
import ItemListCount from '../../components/ItemListCount'

export default function MenuPicker({dataShop}) {
	const [valuePicker, setValuePicker] = useState(dataShop.shops[0]._id)
	const {loading, error, data: dataDish} = useQuery(DISHES_BY_SHOP, {
		variables: {
			idShop: valuePicker
		}
  }) 
  // const {data: dataDishCount} = useQuery(DISH_SHOP)
  // console.log(dataDishCount)
	return (
    <SafeAreaView style={styles.container}>
      <Picker
        selectedValue={valuePicker}
        itemStyle={{height: 100}}
        onValueChange={(itemValue) =>
          setValuePicker(itemValue)
        }>
        {
          dataShop.shops.map((shop,idx) => {
            return (
              <Picker.Item key={idx} label={shop.name} value={shop._id} />
            )
          })
        }
      </Picker>
      {
        loading ? <Loading /> : (
          dataDish.dishesByShop.map(((dish,idx) => {
            return (
              <ItemListCount key={idx} dish={dish} />
            )
          }))
        )
      }
    </SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
    margin:10,
    borderColor: '#bf6363',
    borderWidth:1
  }
})