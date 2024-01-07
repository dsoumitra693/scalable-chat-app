import React from 'react'
import { Stack } from 'expo-router'
import SocketProvider from '../providers/SocketProvider'
import RootLayout from './RootLayout'

const StackLayout = () => {
  return (
    <SocketProvider>
      <RootLayout>
      <Stack screenOptions={{
        headerShown: false
      }} />
      </RootLayout>
    </SocketProvider>
  )
}

export default StackLayout