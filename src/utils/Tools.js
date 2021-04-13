import moment from 'moment';

import _ from 'lodash';
import { Linking, Platform } from 'react-native';

export function convertArrToObj(arr, key) {
  return _.reduce(
    arr,
    (acc, cur) => {
      acc[cur[key]] = cur;
      return acc;
    },
    {},
  );
}

export const arrayRemove = (arr, value) => {
  return arr.filter(function(element) {
    return element !== value;
  });
};

export const calculateRange = (startDate, endDate) => {
  if (startDate || endDate) {
    const { years, months, days } = moment.preciseDiff(startDate, endDate, true);

    let rangeText;

    if (years === 0) {
      if (months === 0) {
        rangeText = `${days}D`;
      } else {
        rangeText = `${months}M ${days}D`;
      }
    } else {
      rangeText = `${years}Y ${months}M ${days}D`;
    }

    return { years, months, days, rangeText };
  }

  return '0D';
};

export const updateDataForList = (list, newData) => {
  let tmpList = [...list];
  const index = _.findIndex(tmpList, { id: newData.id });
  if (index > -1) {
    tmpList[index] = newData;
  } else {
    tmpList = [newData, ...tmpList];
  }
  return tmpList;
};

export const validateForm = (validateType, text) => {
  switch (validateType) {
    case 'email':
      return validateEmail(text);
    case 'password':
      return text?.length > 5;
    case 'phone':
      return validatePhone(text);
    case 'number':
      return validateNumber(text);
    default:
      return true;
  }
};

// Validate fields
export const validateField = name => {
  return name !== '';
};

export const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validatePassword = text => {
  return text?.length > 5;
};

export const checkPhoneType = keyboardType => {
  return keyboardType == 'phone-pad';
};
export const validatePhone = phone => {
  const regex1 = /^[0-9#+*.,]+$/;
  const regex2 = /^0(1\d{9}|8\d{8}|9\d{8})$/;
  return regex1.test(phone) || regex2.test(phone);
};

export const checkTypeNumber = keyboardType => {
  return (
    keyboardType == 'numeric' ||
    keyboardType == 'phone-pad' ||
    keyboardType == 'number-pad' ||
    keyboardType == 'decimal-pad'
  );
};
export const validateNumber = number => {
  const regex1 = /^[-+]?[0-9]*\.?[0-9]?[0-9]?$/;
  const regex2 = /^[-+]?[0-9]*\,?[0-9]?[0-9]?$/;
  const regex3 = /^0(1\d{9}|8\d{8}|9\d{8})$/;
  return regex1.test(number) || regex2.test(number) || regex3.test(number);
};

export const formatDate = date => {
  return moment(date).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')
    ? 'Today'
    : moment(date).format('MMM DD');
};

export const validateName = name => {
  const re = /^[^0-9 *&^$#@!(){}\[\]\\//]+[^0-9*&^$#@!(){}\[\]\\//]+$/;
  return re.test(name);
};

// change alias
export const change_alias = alias => {
  let str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ {2}|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ {2}|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,
    '-',
  );
  str = str.replace(/-+-/g, '-');
  str = str.replace(/^\-+|\-+$/g, '');
  return str;
};

// get user position
export const getUserPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        reject(error);
      },
    );
  });
};

// format money
export const formatMoney = (number, n = 2, x = 3) => {
  const re = `\\d(?=(\\d{${x}})+${n > 0 ? '\\.' : '$'})`;
  return Number(number)
    .toFixed(Math.max(0, ~~n))
    .replace(new RegExp(re, 'g'), '$& ');
};

// check image url
export const checkURLImg = url => {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
};

// open web link
export const openURL = (url, isWeb) => {
  let newUrl = url;
  if (isWeb && newUrl.indexOf('http://') < 0 && newUrl.indexOf('https://') < 0) {
    newUrl = `http://${newUrl}`;
  }
  Linking.canOpenURL(newUrl)
    .then(supported => {
      if (!supported) {
        // console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(newUrl);
      }
    })
    .catch(err => {
      // console.error('An error occurred', err)
    });
};

// format date to vietnamese
export function formatDateToVietnamese(date) {
  moment.locale('vi');
  const now = moment();
  const dateParams = moment(new Date(date));
  const diffDays = now.diff(dateParams, 'days');
  const diffYears = now.diff(dateParams, 'years');
  if (diffDays === 0) {
    return dateParams.fromNow();
  }
  if (diffDays === 1) {
    return dateParams.format('[Hôm qua lúc] HH:mm');
  }
  if (diffYears === 0) {
    return dateParams.format('DD/MM [lúc ]HH:mm');
  }
  return dateParams.format('DD/MM/YYYY');
}

// check if device has notch or not
// export const hasNotch = DeviceInfo.hasNotch();

// check platform
export const isIOS = Platform.OS === 'ios';

// convert hex to rgba
export const hexToRGBA = (hex, opacity) => {
  return `rgba(${(hex = hex.replace('#', ''))
    .match(new RegExp(`(.{${hex.length / 3}})`, 'g'))
    .map(l => {
      return parseInt(hex.length % 2 ? l + l : l, 16);
    })
    .concat(opacity || 1)
    .join(',')})`;
};

// convert hex to rgb
export const hexToRGB = hex => {
  return `rgba(${(hex = hex.replace('#', ''))
    .match(new RegExp(`(.{${hex.length / 3}})`, 'g'))
    .map(l => {
      return parseInt(hex.length % 2 ? l + l : l, 16);
    })
    .join(',')})`;
};

// convert rgb to hex
export const rgbToHex = (r, g, b) =>
  `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
