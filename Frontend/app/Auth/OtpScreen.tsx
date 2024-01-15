import React, { useEffect, useState } from 'react'
import AuthLayout from './AuthLayout'
import { TextInput, useTheme } from 'react-native-paper'
import { Href, useLocalSearchParams, useRouter } from 'expo-router'
import { useAuth } from '../../providers/AuthProvider'
import { AuthBtn } from '../../components/Auth'

const OtpScreen = () => {
  const { colors } = useTheme()
  const [OTP, setOTP] = useState('')
  const [isDisabled, setIsdisabled] = useState(true)
  const router = useRouter()
  const { setActiveCurrentUser } = useAuth()
  const { userId, phone } = useLocalSearchParams();
  const { verifyOtp } = useAuth()

  useEffect(() => {
    setIsdisabled(OTP?.length < 6)
  }, [OTP])

  const handleOtpSubmit = async () => {
    console.log(userId)
    // let res = await verifyOtp(userId as string, OTP)
    let res = 'response'
    let nextScreenUrl: Href<string> = '/'

    if (!!res) {
      setActiveCurrentUser({
        userId: userId as string,
        name: `User${userId?.slice(10)}`,
        phone: phone as string,
        countrycode: '+91',
      })
      nextScreenUrl = '/Auth/NameScreen'

    }

    return router.push(nextScreenUrl)
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
      <AuthBtn
        disabled={isDisabled}
        onPress={handleOtpSubmit}
        text='Login' />
    </AuthLayout>
  )
}

export default OtpScreen