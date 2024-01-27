import React from 'react'
import { ColorValue } from 'react-native';
import { Avatar as AvatarBase } from 'react-native-paper'

interface AvatarProps {
    bgColor: ColorValue;
    uri: string;
}

const Avatar = ({ bgColor, uri }) => {
    return (
        <AvatarBase.Image
            size={40}
            source={{ uri }}
            style={{ backgroundColor: bgColor }} />
    )
}

export default Avatar