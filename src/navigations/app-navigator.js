import {createBottomTabNavigator} from 'react-navigation-tabs';

import UsersScreen from '../scenes/users';
import UserScreen from '../scenes/user';
import SettingsScreen from '../scenes/settings';
import {createStackNavigator} from 'react-navigation-stack';
import {Image} from 'react-native';
import ReactLogo from '../assets/react-logo.png';
import ReactLogoGray from '../assets/react-logo-gray.png';

const TabNavigatorConfig = {
  initialRouteName: 'Users',
  header: null,
  headerMode: 'none',
};

const usersStack = createStackNavigator({
  UsersScreen: {
    screen: UsersScreen,
    navigationOptions: () => ({
      title: 'Users 1',
    }),
  },
  UserScreen: {
    screen: UserScreen,
    navigationOptions: () => ({
      title: 'User Info',
    }),
  },
});

usersStack.navigationOptions = () =>({
  tabBarIcon: null,
});

const RouteConfigs = {
  Users: usersStack,
  Settings: {
    screen: SettingsScreen,
  },
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;
