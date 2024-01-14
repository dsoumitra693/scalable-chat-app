import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Divider, IconButton, Menu, useTheme } from 'react-native-paper'
import { useAuth } from '../../providers/AuthProvider'


const statusbarHeight = StatusBar.currentHeight
const Header = () => {
  const { colors } = useTheme()
  const [visible, setVisible] = useState<boolean>()
  const { currentUser, logoutUser } = useAuth()

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  return (
    <View style={[styles.header, { backgroundColor: colors.background }]}>
      <Text style={[styles.headerText, { color: colors.text }]}>Hello! {currentUser.name}</Text>

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={{ backgroundColor: colors.backdrop }}
        anchor={<IconButton icon="menu" color={colors.primary} size={25} onPress={openMenu} />}>
        <Menu.Item onPress={logoutUser} title="Logout" icon={'logout'} />
        <Divider />
      </Menu>
    </View>)
}

export default Header

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
    paddingLeft: 10,
    maxHeight: 80,
    backgroundColor: 'transparent',
    top: statusbarHeight,
  },
  headerText: {
    fontSize: 25,
    fontWeight: '500',
  }
})