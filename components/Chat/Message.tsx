import { View, Text, StyleSheet } from 'react-native';
import MsgStatusIcon from './MsgStatusIcon';
import { useTheme } from 'react-native-paper';
import React from 'react';
import { IMessage } from '../../Types';

const Message = ({ content, user, status, timestamp }: IMessage) => {
  const theme = useTheme();

  const isUserSent = 0;

  const containerStyle = isUserSent
    ? styles.userSentMessageContainer
    : styles.senderSentMessageContainer;

  return (
    <View style={containerStyle}>
      <View style={[styles.messageContentContainer, { backgroundColor: theme.colors.secondary }]}>
        <Text style={[styles.messageText, { color: theme.colors.text }]}>{content}</Text>
        <View style={styles.timestampContainer}>
          <Text style={[styles.timestampText, { color: theme.colors.disabled }]}>{timestamp}</Text>
          <MsgStatusIcon status={status} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userSentMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  senderSentMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  messageContentContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 16,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'flex-end',
    height:15,
    width:50,
  },
  timestampText: {
    fontSize: 12,
    right:-5
  },
});

export default Message;
