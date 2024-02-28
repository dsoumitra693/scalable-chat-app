import React, { useEffect, useRef, useState } from 'react'
import AuthLayout from './AuthLayout'
import { Text, TextInput, useTheme } from 'react-native-paper'
import { Href, useLocalSearchParams, useRouter } from 'expo-router'
import { useAuth } from '../../providers/AuthProvider'
import { AuthBtn } from '../../components/Auth'
import { NativeSyntheticEvent, TextInputKeyPressEventData, View } from 'react-native'
import { OtpView } from './OtpView'

const OtpScreen = () => {
  const { colors } = useTheme()
  const [OTP, setOTP] = useState<string[]>(Array(6).fill(""))
  const [isDisabled, setIsdisabled] = useState(true)
  const router = useRouter()
  const { setActiveCurrentUser } = useAuth()
  const { userId, phone } = useLocalSearchParams();
  const { verifyOtp } = useAuth()

  useEffect(() => {
    setIsdisabled(OTP?.join("").length < 6)
  }, [OTP])

  const handleOtpSubmit = async () => {
    let id = userId as string
    let res = await verifyOtp(id, OTP.join(''))
    let nextScreenUrl: Href<string> = '/'

    if (!!res) {
      setActiveCurrentUser({
        id: userId as string,
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
      <OtpView OTP={OTP} setOTP={setOTP} />
      <Text style={{
        color: colors.backdrop
      }}>Otp has been sent to the number {" "}
        <Text style={{
          color: colors.primary,
          textDecorationLine: 'underline'
        }}>+91{phone}</Text>
      </Text>
      <AuthBtn
        disabled={isDisabled}
        onPress={handleOtpSubmit}
        text='Login' />
    </AuthLayout>
  )
}

export default OtpScreen

