import React, { useEffect, useState } from 'react'
import AuthLayout from './AuthLayout'
import { Button, TextInput, useTheme } from 'react-native-paper'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useAuth } from '../../providers/AuthProvider'

const OtpScreen = () => {
  const { colors } = useTheme()
  const [OTP, setOTP] = useState<string>()
  const [isDisabled, setIsdisabled] = useState(true)
  const router = useRouter()
  const { setActiveCurrentUser } = useAuth()
  const { userId, phone } = useLocalSearchParams();
  const { verifyOtp, createJWT } = useAuth()

  useEffect(() => {
    setIsdisabled(OTP?.length < 6)
  }, [OTP])

  const handleOtpSubmit = async () => {
    console.log(userId)
    let res = await verifyOtp(userId as string, OTP)

    if (!!res) {
      setActiveCurrentUser({
        userId: userId as string,
        name: `User${userId.slice(10)}`,
        phone: phone as string,
        countrycode: '+91',
      })
      router.push('/Auth/NameScreen')

      return
    }

    return router.push('/')
  }
  return (
    <AuthLayout>
      <TextInput
        keyboardType='phone-pad'
        mode='outlined'
        maxLength={6}
        placeholder='Enter the OTP'
        value={OTP}
        outlineColor={colors.primary}
        onChangeText={text => setOTP(text)}
        style={{ width: 300, height: 60, fontSize: 20, margin: 20, }} />
      <Button mode="contained"
        style={{ padding: 10, fontSize: 20 }}
        disabled={isDisabled}
        onPress={handleOtpSubmit}>
        Login
      </Button>
    </AuthLayout>
  )
}

export default OtpScreen