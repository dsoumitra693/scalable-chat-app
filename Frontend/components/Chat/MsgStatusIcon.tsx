import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';

const MessageStatusIcon = ({ status }) => {
  const { colors } = useTheme();

  const iconProps = {
    color: colors.backdrop,
    size: 15,
  };

  let IconComponent:() => React.JSX.Element;

  switch (status) {
    case 'sent':
      IconComponent = () => <IconButton icon="check" {...iconProps} />;
      break;
    case 'received':
      IconComponent = () => <IconButton icon="check-all" {...iconProps} />;
      break;
    case 'read':
      IconComponent = () => <IconButton icon="check-all" {...iconProps} color={colors.text} />;
      break;
    default:
      IconComponent = () => null;
  }

  return <IconComponent />;
};

export default MessageStatusIcon;
