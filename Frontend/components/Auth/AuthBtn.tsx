import React from 'react'
import { TouchableRipple, Text, useTheme } from 'react-native-paper'
import { StyleProp, ViewStyle } from 'react-native';

interface AuthBtnProps {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const AuthBtn: React.FC<AuthBtnProps> = ({ text, style, onPress, disabled }) => {
  console.log(disabled)
  const { colors } = useTheme()
  return (<TouchableRipple
    style={[{
      bottom: 100,
      position: 'absolute',
      width: 300,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      padding: 20,
      backgroundColor: disabled ? colors.disabled : colors.primary
    }, style]}
    disabled={disabled}
    onPress={onPress}>
    <Text style={{ fontSize: 20, fontWeight: '200', color: disabled ? colors.placeholder : colors.text }}>{text}</Text>
  </TouchableRipple>
  )
}

export default AuthBtn