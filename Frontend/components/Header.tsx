import { Appbar } from 'react-native-paper'
import { useRouter } from 'expo-router'
import React, { memo, useCallback } from 'react'

export interface HeaderProps {
    title:string;
}

const Header:React.FC<HeaderProps> = memo(({title}) => {
    const router = useRouter()
    const _goBack = useCallback(() => {
        if (router) {
            router.back()
        }
    }, [router])

    const ICON_NAME = 'magnify';

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title={title} />
            <Appbar.Action icon={ICON_NAME} />
        </Appbar.Header>
    )
})

export default Header