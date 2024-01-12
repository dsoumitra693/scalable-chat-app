import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton, useTheme } from 'react-native-paper'


const statusbarHeight = StatusBar.currentHeight
const Header = () => {
  const { colors } = useTheme()

  return (
    <View style={[styles.header, {backgroundColor:colors.background}]}>
      <Text style={styles.headerText}>FastChat</Text>
      <IconButton
        icon="menu"
        color={colors.primary}
        size={25}
        onPress={() => console.log('Pressed')}
      />
    </View>)
}

export default Header

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
    paddingLeft:10,
    maxHeight: 80,
    backgroundColor:'transparent',
    top: statusbarHeight,
  },
  headerText: {
    fontSize: 25,
    fontWeight: '500',
  }
})