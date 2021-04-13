import { Navigation } from 'react-native-navigation';
import { withReduxProvider } from '../redux/store';

import Login from '../screens/Login';
import Register from '../screens/Login/Register';
import ForgetPassword from '../screens/Login/ForgetPassword';

import Loading from '../screens/Utils/Loading';
import InAppNotification from '../screens/Utils/InAppNotification';
import IntroScreen from '../screens/Intro';
import Home from '../screens/Home';
import Settings from '../screens/Settings';

const SCREENS_WITH_REDUX = {
  Login,
  Register,
  ForgetPassword,
  IntroScreen,
  Home,
  Settings,
};
const SCREENS = {
  Loading,
  InAppNotification,
};

function registerScreens() {
  Object.keys(SCREENS_WITH_REDUX).map((screenName) => {
    Navigation.registerComponent(
      screenName,
      () => withReduxProvider(SCREENS_WITH_REDUX[screenName]),
      () => SCREENS_WITH_REDUX[screenName],
    );
  });
  Object.keys(SCREENS).map((screenName) => {
    Navigation.registerComponent(
      screenName,
      () => SCREENS_WITH_REDUX[screenName],
      () => SCREENS_WITH_REDUX[screenName],
    );
  });
}

export default registerScreens;
