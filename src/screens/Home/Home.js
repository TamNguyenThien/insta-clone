import React, { useLayoutEffect, useState, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { PROFILE } from '../../constants'
import { FlatList } from 'react-native-gesture-handler'
import { Post, PostImage, Name, Description, Avatar, Header, Loading } from './styles'
export default function HomeScreen ({ navigation }) {
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity
  //         style={{marginRight: 15}}
  //         onPress={() => navigation.navigate(PROFILE)}>
  //         <FontAwesome5 name="plus" size={30} />
  //       </TouchableOpacity>
  //     )
  //   })
  // }, [navigation])
  const [feed, setFeed] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [refeshing, setRefeshing] = useState(false)

  async function loadPage (pageNumber = page, shouldRefesh = false) {
    if (total && pageNumber > total) return
    setLoading(true)
    const response = await fetch(
      `http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`
    )
    // console.log(response)
    const data = await response.json()
    const totalItems = response.headers.get('X-Total-Count')
    setTotal(Math.floor(totalItems / 5))
    setFeed(shouldRefesh ? data : [...feed, ...data])
    setPage(pageNumber + 1)
    setLoading(false)
  }

  useEffect(() => {
    loadPage()
  }, [])

  async function refeshList () {
    setRefeshing(true)
    await loadPage(1, true)
    setRefeshing(false)
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={feed}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refeshList}
        refreshing={refeshing}
        ListFooterComponent={loading && <Loading />}
        keyExtractor={post => String(post.id)}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>{item.author.name}</Name>
            </Header>
            <PostImage source={{ uri: item.image }} />
            <Description>
              <Name>{item.author.name}</Name>{item.description}
            </Description>
          </Post>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: 'center',
    // justifyContent: 'center'
  }
})
