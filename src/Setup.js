// import * as RNLocalize from 'react-native-localize';
// import { getData } from './utils/PersistUtil';
// import i18n from './i18n';
// import { actions } from './redux/AppRedux';
// import { registerScreens, NavigationUtils } from './navigation';
// import { iconsLoaded } from './utils/AppIcons';
// import { store } from './redux/store';

// // Here some global listeners could be placed
// // ...

// export const startApp = async () => {
//   registerScreens();
//   try {
//     const resIcons = await iconsLoaded;
//     // Config i18n, if project don't use it. Just remove this line below
//     configI18n();
//     console.log(resIcons);
//     const isSkip = store.getState().app.isSkip;
//     console.log('isSkip', isSkip);

//     if (!isSkip) {
//       NavigationUtils.startIntoContent();
//       // return;
//     }
//     const user = store.getState().auth.user;
//     if (user) {
//       NavigationUtils.startMainContent();
//     } else {
//       NavigationUtils.startLoginContent();
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// const configI18n = () => {
//   const { language } = store.getState().app;
//   if (language) {
//     i18n(language);
//   } else {
//     const localLanguage = RNLocalize.getLocales();
//     let finalLanguage = 'fr';
//     if (localLanguage && localLanguage[0]) {
//       finalLanguage = localLanguage[0].languageCode === 'fr' ? 'fr' : 'en';
//     }
//     console.log(actions);

//     store.dispatch(actions.setLanguage(finalLanguage));
//     i18n(finalLanguage);
//   }
// };

import registerScreens from './navigation/RegisterScreens';

export const startApp = async () => {
  try {
    registerScreens();
  } catch (err) {
    console.log(err);
  }
};
