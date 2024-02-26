import React, { useEffect, useRef, useState } from 'react'
import AuthLayout from './AuthLayout'
import { Text, TextInput, useTheme } from 'react-native-paper'
import { Href, useLocalSearchParams, useRouter } from 'expo-router'
import { useAuth } from '../../providers/AuthProvider'
import { AuthBtn } from '../../components/Auth'
import { NativeSyntheticEvent, TextInputKeyPressEventData, View } from 'react-native'

const OtpScreen = () => {
  const { colors } = useTheme()
  const [OTP, setOTP] = useState<string[]>(Array(6).fill(""))
  const [isDisabled, setIsdisabled] = useState(true)
  const router = useRouter()
  const { setActiveCurrentUser } = useAuth()
  const { userId, phone } = useLocalSearchParams();
  const { verifyOtp } = useAuth()

  useEffect(() => {
    console.log(OTP)
    setIsdisabled(OTP?.length < 6)
  }, [OTP])

  const handleOtpSubmit = async () => {
    console.log(userId)
    // let res = await verifyOtp(userId as string, OTP.join(''))
    let res = 'res'
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
      <OtpView otp={OTP} setOtp={setOTP} />
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

interface OtpViewProps {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>
}

const OtpView: React.FC<OtpViewProps> = ({ otp, setOtp }) => {

 const textInputRefs = Array<typeof useRef>
  const handleTextInput = (text: string, n: number) => {
    console.log(text, n)
    let _otp = otp
    _otp[n] = text
    setOtp(_otp)


  }
  const handleKeyPress = (evt: NativeSyntheticEvent<TextInputKeyPressEventData>, n: number) => {
    if (evt.nativeEvent.key === "Backspace") {
      let _otp = otp
      _otp[n] = ''
      setOtp(_otp)
      
    }
  }
  return (
    <View style={{
      flexDirection: 'row',
    }}>
      {[0, 1, 2, 3, 4, 5].map(n => (
        <TextInput key={~~10 * Math.random()} value={otp[n] || ''}
        ref={textInputRefs[n]}
          mode='outlined'
          maxLength={1}
          style={{
            width: 45,
            aspectRatio: 4 / 6,
            margin: 5,
            textAlign: 'center'
          }}
          onChangeText={text => handleTextInput(text, n)}
          onKeyPress={e => handleKeyPress(e, n)}
          keyboardType='phone-pad'
        />
      ))}
    </View >
  )
}