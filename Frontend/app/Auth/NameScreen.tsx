import React, { useEffect, useState } from 'react'
import AuthLayout from './AuthLayout'
import { Button, TextInput, useTheme } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useAuth } from '../../providers/AuthProvider'

const NameScreen = () => {
    const { colors } = useTheme()
    const [isDisabled, setIsdisabled] = useState(true)
    const router = useRouter()
    const { currentUser, setActiveCurrentUser } = useAuth()
    const { updateName } = useAuth()
    const [name, setName] = useState<string>(currentUser.name)

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
                keyboardType='name-phone-pad'
                mode='outlined'
                maxLength={128}
                placeholder='Enter your name'
                value={name}
                outlineColor={colors.primary}
                onChangeText={text => setName(text)}
                style={{ width: 300, height: 60, fontSize: 20, margin: 20, }} />
            <Button mode="contained"
                style={{ padding: 10, fontSize: 20 }}
                disabled={isDisabled}
                onPress={handleNameSubmit}>
                Change your name to a cool one!
            </Button>
        </AuthLayout>
    )
}

export default NameScreen