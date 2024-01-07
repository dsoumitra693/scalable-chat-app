import React, { useRef } from 'react';
import { FlashList } from '@shopify/flash-list';
import Message from './Message';
import { IMessage } from '../../Types';

const Messages = ({ msges }) => {
  const flashListRef = useRef<FlashList<IMessage>>(null);
  const scrollToEnd = () => flashListRef.current?.scrollToEnd({ animated: true})
  
  return (
    <FlashList
    style={{backgroundColor:'#000'}}
      ref={flashListRef}
      onLoad={scrollToEnd}
      contentContainerStyle={{ padding: 10 }}
      data={msges}
      renderItem={({ item }) => <Message {...item} />}
      estimatedItemSize={20}
    />
  );
};

export default Messages;
