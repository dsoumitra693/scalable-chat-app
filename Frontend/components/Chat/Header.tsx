import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Appbar, Avatar, Badge, useTheme } from 'react-native-paper'
import { useRouter } from 'expo-router'

const Header = ({ name, avatar }) => {
  const { colors } = useTheme()
  const router = useRouter()
  return (
    <Appbar.Header style={{ backgroundColor: colors.surface, paddingRight: 10 }}>
      <Appbar.BackAction onPress={() => router.back()} />
      <Appbar.Content title={name} />
      <Appbar.Action icon="video-plus" />
      <Appbar.Action icon="phone-plus" />
      <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
        <Avatar.Image
          size={30}
          source={{ uri: avatar, }} />
        <Badge size={10} style={{
          position: 'absolute',
          top: 3,
          right: 1,
          borderWidth: 1.5,
        }} />
      </View>
    </Appbar.Header>
  )
}

export default Header

const styles = StyleSheet.create({})