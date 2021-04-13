import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import { memoize } from 'lodash';
import { I18nManager } from 'react-native';
import en from './en.json';

const translationGetters = {
  en,
};

const setI18nConfig = (lang) => {
  // fallback if no available language fits
  const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
  );
  const fallback = { languageTag: 'en', isRTL: false };
  let { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;
  if (lang) {
    languageTag = lang;
  }
  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);

  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag] };
  i18n.locale = languageTag;
  i18n.translate = translate;
};

export const addHandleLocaleChange = (func) => RNLocalize.addEventListener('change', func);
export const removeHandleLocaleChange = (func) => RNLocalize.removeEventListener('change', func);
export const translate = (text) => i18n.t(text);

export default setI18nConfig;
