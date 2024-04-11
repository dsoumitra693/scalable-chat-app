import React, { memo } from 'react';
import { ColorValue } from 'react-native';
import { Avatar as AvatarBase } from 'react-native-paper'

/**
 * Avatar component.
 *
 * @component
 * @example
 * // Usage:
 * <Avatar bgColor="#000" uri="https://example.com/avatar.png" />
 *
 * @param {ColorValue} [bgColor] - The background color of the avatar.
 * @param {string} [uri] - The URI of the avatar image.
 * @returns {JSX.Element} - The rendered Avatar component.
 */
interface AvatarProps extends React.PropsWithChildren<{
    /**
     * The background color of the avatar.
     */
    bgColor?: ColorValue;
    /**
     * The URI of the avatar image.
     */
    uri?: string;
}> { }

const Avatar = memo(({ bgColor, uri }: AvatarProps) => {
    return (
        <AvatarBase.Image
            size={40}
            source={{ uri }}
            style={{ backgroundColor: bgColor }} />
    )
})

export default Avatar