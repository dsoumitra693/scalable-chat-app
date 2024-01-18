import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Divider, IconButton, Menu, Searchbar, useTheme } from 'react-native-paper'
import { useAuth } from '../../providers/AuthProvider'


const statusbarHeight = StatusBar.currentHeight
const Header = () => {
  const { colors } = useTheme()
  const [visible, setVisible] = useState(false)
  const { currentUser, logoutUser } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)
  const onChangeSearch = (query: string) => setSearchQuery(query)

  return (
    <View style={[styles.header, { backgroundColor: colors.surface }]}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 10,
      }}>
        <Text style={[styles.headerText, { color: colors.text }]}>Hello! {currentUser.name}</Text>

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          contentStyle={{ backgroundColor: colors.background, borderRadius:10, top:30 }}
          anchor={<IconButton icon="menu" color={colors.primary} size={25} onPress={openMenu} />}>
          <Menu.Item onPress={logoutUser} title="Logout" icon={'logout'} />
        </Menu>
      </View>
      <Searchbar
        placeholder="Find People"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{width:'95%', borderRadius:20}}
      />
    </View>)
}

export default Header

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    top: statusbarHeight,
    paddingBottom:35
  },
  headerText: {
    fontSize: 25,
    fontWeight: '500',
  }
})