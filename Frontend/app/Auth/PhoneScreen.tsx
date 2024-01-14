import React, { useEffect, useState } from 'react'
import AuthLayout from './AuthLayout'
import { Button, TextInput, useTheme } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useRequestOtp } from '../../Api/Auth'

const PhoneScreen = () => {
  const theme = useTheme()
  const [phone, setPhone] = useState<string>()
  const [isDisabled, setIsdisabled] = useState(true)
  const router = useRouter()
  useEffect(() => {
    setIsdisabled(phone?.length < 10)
  }, [phone])

  const handlePhoneSubmit = async () => {
    let userId = await useRequestOtp<string>(`91${phone}`)
    console.log(userId)
    router.push({ pathname: `/Auth/OtpScreen`, params: { userId, phone } })
  }

  return (
    <AuthLayout>
      <TextInput
        keyboardType='phone-pad'
        mode='outlined'
        maxLength={10}
        placeholder='Enter your phone number'
        value={phone}
        outlineColor={theme.colors.primary}
        onChangeText={text => setPhone(text)}
        style={{ width: 300, height: 60, fontSize: 20, margin: 20 }} />
      <Button mode="contained"
        style={{ padding: 10, fontSize: 20 }}
        disabled={isDisabled}
        theme={theme}
        onPress={handlePhoneSubmit}>
        Get OTP
      </Button>
    </AuthLayout>
  )
}

export default PhoneScreen