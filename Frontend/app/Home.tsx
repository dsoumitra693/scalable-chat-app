import React from 'react'
import { Header,Peoples } from '../components/Home'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from 'react-native-paper'


const Home = () => {
  const {colors} = useTheme()
  return (
    <>
    <StatusBar backgroundColor={colors.background}/>
        <Header />
        <Peoples />
    </>
  )
}

export default Home