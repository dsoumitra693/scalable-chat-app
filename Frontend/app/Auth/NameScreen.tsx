import React, { useEffect, useState } from 'react'
import AuthLayout from './AuthLayout'
import { TextInput, useTheme } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useAuth } from '../../providers/AuthProvider'
import { AuthBtn } from '../../components/Auth'

const NameScreen = () => {
    const { colors } = useTheme()
    const [isDisabled, setIsdisabled] = useState(true)
    const router = useRouter()
    const { currentUser, setActiveCurrentUser } = useAuth()
    const { updateName } = useAuth()
    const [name, setName] = useState(currentUser.name)

    useEffect(() => {
        setIsdisabled(name?.length < 1)
    }, [name])

    const handleNameSubmit = async () => {
        console.log(currentUser.userId)
        updateName(name)
        setActiveCurrentUser({
            ...currentUser,
            name,
        })
        router.push('/')
    }
    return (
        <AuthLayout>
            <TextInput
                autoFocus
                keyboardType='name-phone-pad'
                mode='outlined'
                maxLength={128}
                placeholder='Enter your name'
                value={name}
                outlineColor={colors.primary}
                onChangeText={text => setName(text)}
                style={{ width: 300, height: 60, fontSize: 20, margin: 20, }} />
            <AuthBtn
                disabled={isDisabled}
                onPress={handleNameSubmit}
                text='Give a cool name!' />
        </AuthLayout>
    )
}

export default NameScreen