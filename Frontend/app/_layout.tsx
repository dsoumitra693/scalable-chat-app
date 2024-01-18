import React from 'react'
import { Stack } from 'expo-router'
import RootLayout from './RootLayout'
import AuthProvider from '../providers/AuthProvider'
import SocketProvider from '../providers/SocketProvider'

const StackLayout = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <RootLayout>
          <Stack screenOptions={{
            headerShown: false
          }} />
        </RootLayout>
      </SocketProvider>
    </AuthProvider>
  )
}

export default StackLayout