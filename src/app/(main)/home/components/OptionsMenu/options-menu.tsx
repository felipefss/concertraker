import { ReactElement } from 'react';
import { Menu } from 'react-native-paper';

interface Props {
  isVisible: boolean;
  anchor: ReactElement;
  onClose: () => void;
}

export function OptionsMenu({ isVisible, anchor, onClose }: Props) {
  return (
    <Menu visible={isVisible} anchor={anchor} onDismiss={onClose}>
      <Menu.Item leadingIcon="edit" title="Edit" />
      <Menu.Item leadingIcon="delete" title="Delete" />
      {/* <Divider /> */}
      {/* <Menu.Item title="Setlist" /> */}
    </Menu>
  );
}
