import { Text, View } from 'react-native'
import React from 'react'
import { Badge, List, useTheme } from 'react-native-paper'
import { formateText } from '../../utils/textFormate';
import { useRouter } from 'expo-router';
import Avatar from '../Avatar';
import { IPeople } from '../../Types';

const MAX_MSG_LENGTH = 40
const People = (props: IPeople) => {
    const theme = useTheme()
    const router = useRouter()
    const navigateToChat = () => router.push('/Chat/')
    return (
        <List.Item
            onPress={navigateToChat}
            title={props.name}
            style={{ padding: 10, paddingHorizontal:15, height: 70,backgroundColor: theme.colors.background }}
            description={formateText(props.lastmsg.content, MAX_MSG_LENGTH)}
            left={() => (
                <View style={{ position: 'relative' }}>
                    <Avatar uri={props.avatar}/>
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