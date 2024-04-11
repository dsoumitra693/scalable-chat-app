import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { IconButton, Menu as MenuBase, useTheme } from "react-native-paper";
import { IMenuItem } from "../Types";

interface MenuProps {
  menuItems: IMenuItem[]
}

const Menu: React.FC<MenuProps> = ({ menuItems = [] }) => {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();
  const toggleMenu = () => setVisible(!visible);
  const closeMenu = () => setVisible(false);
  return (
    <MenuBase
      visible={visible}
      onDismiss={closeMenu}
      contentStyle={{
        backgroundColor: colors.background,
        borderRadius: 10,
        top: 30,
        padding: 10,
      }}
      anchor={
        <IconButton
          icon="menu"
          color={colors.primary}
          size={25}
          onPress={toggleMenu}
        />
      }
    >
      {menuItems.map((item, idx) => (
        <MenuBase.Item
          key={item.title || idx}
          onPress={() => {
            if (typeof item.callback === 'function') {
              item.callback();
            }
            closeMenu();
          }}
          title={item.title}
          icon={item.iconName}
        />
      ))}
    </MenuBase>
  );
};

export default Menu;
