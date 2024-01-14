import React, { useEffect } from 'react'
import { Header, Peoples } from '../components/Home'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from 'react-native-paper'
import { useAuth } from '../providers/AuthProvider'


const Home = () => {
  const { colors } = useTheme()

  const { currentUser, setActiveCurrentUser, createJWT } = useAuth()

  useEffect(() => {
    let fetchJWT = async () => {
      let jwt = await createJWT()
      setActiveCurrentUser({ ...currentUser, jwt })
    }
    let intervalID = setInterval(
      fetchJWT,
      14 * 60 * 1000) //14 minutes

    return () => {
      clearInterval(intervalID)
    }
  }, [])


  return (
    <>
      <StatusBar backgroundColor={colors.background} />
      <Header />
      <Peoples />
    </>
  )
}

export default Home