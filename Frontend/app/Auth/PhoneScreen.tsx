import React, { useEffect, useState } from 'react'
import AuthLayout from './AuthLayout'
import { TextInput, useTheme } from 'react-native-paper'
import { Link, useRouter } from 'expo-router'
import { useAuth } from '../../providers/AuthProvider'
import { AuthBtn } from '../../components/Auth'

const PhoneScreen = () => {
  const theme = useTheme()
  const [phone, setPhone] = useState('')
  const [isDisabled, setIsdisabled] = useState(true)
  const router = useRouter()
  const { requestOtp } = useAuth()

  useEffect(() => {
    setIsdisabled(phone?.length < 10)
  }, [phone])

  const handlePhoneSubmit = async () => {
    let userId = await requestOtp(phone)
    // let userId = ''
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
        outlineColor={theme.colors.placeholder}
        onChangeText={text => setPhone(text)}
        style={{ width: 300, height: 60, fontSize: 20, margin: 20 }} />
      <Link href={'/Auth/OtpScreen'} asChild>
        <AuthBtn
          text='Get OTP'
          disabled={isDisabled}
          onPress={handlePhoneSubmit} />
      </Link>
    </AuthLayout>
  )
}

export default PhoneScreen