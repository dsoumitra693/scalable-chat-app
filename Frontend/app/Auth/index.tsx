import React from 'react'
import { Button, useTheme } from 'react-native-paper'
import { Link } from 'expo-router'
import AuthLayout from './AuthLayout'

const Auth = () => {

  return (
    <AuthLayout>
      <Link href={'/Auth/PhoneScreen'} asChild>
        <Button mode="contained">
          Continue to Login
        </Button>
      </Link>
    </AuthLayout>
  )}

export default Auth