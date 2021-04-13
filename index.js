// import App from './src/Setup';

// App();

// import { Navigation } from 'react-native-navigation';
// import App from './App';
// Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
// Navigation.events().registerAppLaunchedListener(() => {
//   Navigation.setRoot({
//     root: {
//       stack: {
//         children: [
//           {
//             component: {
//               name: 'com.myApp.WelcomeScreen',
//             },
//           },
//         ],
//       },
//     },
//   });
// });

import { Navigation } from 'react-native-navigation';
import { startApp } from './src/Setup';

Navigation.events().registerAppLaunchedListener(() => {
  startApp();
});
