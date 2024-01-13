import React, { useEffect, useState } from 'react'
import AuthLayout from './AuthLayout'
import { Button, TextInput, useTheme } from 'react-native-paper'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useAuth } from '../../providers/AuthProvider'
import { useVerifyOtp } from '../../Api/Auth'

const OtpScreen = () => {
  const { colors } = useTheme()
  const [OTP, setOTP] = useState<string>()
  const [isDisabled, setIsdisabled] = useState(true)
  const router = useRouter()
  const { loginUser } = useAuth()
  const { userId, phone } = useLocalSearchParams();

  useEffect(() => {
    setIsdisabled(OTP?.length < 6)
  }, [OTP])

  const handleOtpSubmit = async () => {
    let session = useVerifyOtp(userId as string, OTP)
    // loginUser({
    //   userId: userId as string,
    //   name: 'Soumo',
    //   phone: phone as string,
    //   countrycode: '+91'
    // })
    router.push('/')
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