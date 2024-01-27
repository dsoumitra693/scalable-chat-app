import React from 'react'
import { Appbar } from 'react-native-paper'
import { useRouter } from 'expo-router'



interface HeaderProps {
    title:string;
}

const Header:React.FC<HeaderProps> = ({title}) => {
    const router = useRouter()
    const _goBack = () => {
        router.back()
    }

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title={title} />
            <Appbar.Action icon={'magnify'} />
        </Appbar.Header>
    )
}

export default Header