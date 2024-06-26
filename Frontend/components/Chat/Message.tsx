import { View, Text, StyleSheet } from 'react-native';
import MsgStatusIcon from './MsgStatusIcon';
import { useTheme } from 'react-native-paper';
import React from 'react';
import { IMessage } from '../../Types';
import { useAuth } from '../../providers/AuthProvider';

const Message = ({ content, sender, reciver, status, timestamp }: IMessage) => {
  const theme = useTheme();
  const { currentUser } = useAuth()
  const isUserSent = sender === currentUser.countrycode + currentUser.phone
  // let time = timestamp?.toTimeString()?.slice(0, 5)
  let time = "00:00"

  const containerStyle = isUserSent
    ? { ...styles.userSentMessageContainer, backgroundColor: theme.colors.primary }
    : { ...styles.senderSentMessageContainer, backgroundColor: theme.colors.surface }

  return (
    <View style={[containerStyle, styles.messageContentContainer]}>
      <Text style={[styles.messageText, { color: theme.colors.text }]}>{content}</Text>
      <View style={styles.timestampContainer}>
        <Text style={[styles.timestampText, { color: theme.colors.disabled }]}>{time}</Text>
        <MsgStatusIcon status={status} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userSentMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end'
  },
  senderSentMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  messageContentContainer: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 18,
    maxWidth: '80%'
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    height: 15,
    width: 50,
  },
  timestampText: {
    fontSize: 12,
    right: -25,
    bottom:-10
  },
});

export default Message;
