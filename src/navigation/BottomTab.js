import { Colors, Fonts } from '../themes';
import { iconsMap } from '../utils/AppIcons';

const bottomTab = (componentName, icon, defaultTopBar, bottomTabName, selectedIcon, options) => ({
  stack: {
    children: [
      {
        component: {
          name: componentName,
          passProps: {},
          options: {
            topBar: {
              ...defaultTopBar,
            },
            bottomTab: {
              ...bottomTabConfig,
              icon: iconsMap[icon],
              text: bottomTabName,
              selectedIcon: iconsMap[selectedIcon],
            },
          },
        },
      },
    ],
  },
  options,
});

const bottomTabConfig = {
  textColor: '#89857A',
  iconColor: '#bebebe',
  selectedIconColor: '#ffcd17',
  selectedTextColor: '#0d0a03',
  fontFamily: Fonts.type.regular,
  iconInsets: {
    top: 3,
    left: 0,
    bottom: 0,
    right: 0,
  },
  fontSize: 10,
  drawBehind: false,
  disableIconTint: true, // set true if you want to disable the icon tinting
  disableSelectedIconTint: true,
};

export default bottomTab;
