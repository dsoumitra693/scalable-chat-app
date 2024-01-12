import React, { useRef } from 'react';
import { FlashList } from '@shopify/flash-list';
import Message from './Message';
import { IMessage } from '../../Types';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

const Messages = ({ msges }) => {
  const { colors } = useTheme()
  const flashListRef = useRef<FlashList<IMessage>>(null);
  const scrollToEnd = () => flashListRef.current?.scrollToEnd({ animated: true })

  return (
    <View style={{ flex: 1, backgroundColor: colors.disabled }}>
      <FlashList
        ref={flashListRef}
        onLoad={scrollToEnd}
        contentContainerStyle={{ padding: 10 }}
        data={msges}
        renderItem={({ item }) => <Message {...item} />}
        estimatedItemSize={20}
      />
    </View>
  );
};

export default Messages;
