import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { useAuth } from '../../providers/AuthProvider'
import { useRouter } from 'expo-router'
import Menu from '../Menu'
import { IMenuItem } from '../../Types'
import SearchBar from '../SearchBar'
import useUser from '../../hooks/useUser'


const statusbarHeight = StatusBar.currentHeight
const Header = () => {
  const { colors } = useTheme()
  const { currentUser, logoutUser } = useAuth()
  const { searchUser } = useUser()
  const router = useRouter()

  const menuItem: IMenuItem[] = [
    {
      title: "Settings",
      iconName: "cog-outline",
      callback: () => router.push("/Settings/")
    },
    {
      title: "Logout",
      iconName: "logout",
      callback: logoutUser
    }
  ]

  const handleOnSearchSubmit = async (query: string) => {
    let user = await searchUser(["+91" + query])
    console.log(user)
  }


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

        <Menu menuItems={menuItem} />
      </View>
      <SearchBar
        placeholder="Find People"
        searchCallback={handleOnSearchSubmit} />
    </View>)
}

export default Header

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    top: statusbarHeight,
    paddingBottom: 35
  },
  headerText: {
    fontSize: 25,
    fontWeight: '500',
  }
})