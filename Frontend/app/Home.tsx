import React, { useEffect } from 'react'
import { Header, Peoples } from '../components/Home'
import { StatusBar } from 'expo-status-bar'
import { FAB, useTheme } from 'react-native-paper'
import { useAuth } from '../providers/AuthProvider'
import { useRouter } from 'expo-router'


const Home = () => {
  const { colors } = useTheme()
  const router = useRouter()
  const { currentUser, setActiveCurrentUser, createJWT } = useAuth()

  useEffect(() => {
    let fetchJWT = async () => {
      let jwt = await createJWT()
      setActiveCurrentUser({ ...currentUser, jwt })
    }
    fetchJWT()
    let intervalID = setInterval(
      fetchJWT,
      14 * 60 * 1000) //14 minutes

    return () => {
      clearInterval(intervalID)
    }
  }, [])


  return (
    <>
      <StatusBar backgroundColor={colors.surface} />
      <Header />
      <Peoples />
      <FAB
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          backgroundColor: colors.primary
        }}
        icon="message"
        animated
        onPress={() => router.push('/Contact/')}
      />
    </>
  )
}

export default Home