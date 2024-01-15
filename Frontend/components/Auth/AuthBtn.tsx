import React from 'react'
import { Button, Text } from 'react-native-paper'
import { StyleProp, ViewStyle } from 'react-native';

interface AuthBtnProps {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const AuthBtn: React.FC<AuthBtnProps> = ({ text, style, onPress, disabled }) => {
  return (<Button mode="contained"
    style={[{
      bottom: 100,
      position: 'absolute',
      width: 300,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      padding: 10,
    }, style]}
    disabled={disabled}
    onPress={onPress}>
    <Text style={{ fontSize: 18, fontWeight: '200' }}>{text}</Text>
  </Button>
  )
}

export default AuthBtn