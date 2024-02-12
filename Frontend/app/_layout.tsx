import React from 'react'
import { Stack } from 'expo-router'
import RootLayout from './RootLayout'
import {AuthProvider, SocketProvider,PeopleProvider} from '../providers'

const StackLayout = () => {
  return (
    <AuthProvider>
      <PeopleProvider>
        <SocketProvider>
          <RootLayout>
            <Stack screenOptions={{
              headerShown: false
            }} />
          </RootLayout>
        </SocketProvider>
      </PeopleProvider>
    </AuthProvider>
  )
}

export default StackLayout