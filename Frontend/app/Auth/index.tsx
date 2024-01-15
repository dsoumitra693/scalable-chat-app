import React from 'react'
import AuthLayout from './AuthLayout'
import AnimatedLottieView from 'lottie-react-native'
import { chattingAnimation } from '../../assets/animations'
import { AuthBtn } from '../../components/Auth'
import { useRouter } from 'expo-router'

const Auth = () => {
  const router = useRouter()
  return (
    <AuthLayout>
      <AnimatedLottieView
        autoPlay
        style={{
          width: 500,
        }}
        source={chattingAnimation}
      />
      <AuthBtn text={"Continue to Login"} onPress={() => { router.push('/Auth/PhoneScreen') }} />
    </AuthLayout>
  )
}

export default Auth