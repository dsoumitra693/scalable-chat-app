import { Text, View } from 'react-native'
import React from 'react'
import { Avatar, Badge, List, useTheme } from 'react-native-paper'
import { formateText } from '../../utils/textFormate';
import { useRouter } from 'expo-router';

interface IPeople {
    name: string;
    avatar: string;
    lastMsg: string;
    bgColor: string;
}
const MAX_MSG_LENGTH = 40
const People = (props: IPeople) => {
    const theme = useTheme()
    const router = useRouter()
    const navigateToChat = () => router.push(`/Chat/${props.name}`)
    return (
        <List.Item
            onPress={navigateToChat}
            title={props.name}
            style={{ padding: 10, paddingHorizontal:15, height: 70,backgroundColor: theme.colors.background }}
            description={formateText(props.lastMsg, MAX_MSG_LENGTH)}
            left={() => (
                <View style={{ position: 'relative' }}>
                    <Avatar.Image
                        size={40}
                        source={{ uri: props.avatar }}
                        style={{ backgroundColor: props.bgColor }} />
                    <Badge size={10} style={{
                        backgroundColor: theme.colors.accent,
                        position: 'absolute',
                        top: 2,
                        right: 5,
                        borderWidth: 1.5,
                        borderColor: theme.colors.background
                    }} />
                </View>
            )}
            right={() => (
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{color:theme.colors.text}}>4 min</Text>
                    <Badge style={{ backgroundColor: theme.colors.notification, color:theme.colors.text}}>3</Badge>
                </View>
            )}
        />
    )
}

export default People