import React, { useState } from "react";
import { IconButton, Menu as MenuBase, useTheme } from "react-native-paper";
import { IMenuItem } from "../../Types";


interface MenuProps {
  menuItems: IMenuItem[]
}


const Menu: React.FC<MenuProps> = ({ menuItems }) => {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();
  const openMenu = () => setVisible(true);
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
          onPress={openMenu}
        />
      }
    >
      {menuItems?.map((item, idx) => (
        <MenuBase.Item
          key={idx}
          onPress={() => {
            item.callback()
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
