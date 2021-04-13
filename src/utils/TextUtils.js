import moment from 'moment';

export const timeToNow = time => {
  return moment(time).fromNow();
};

export const setStartTimeInDate = strDate => {
  const isCurrentDay = strDate === moment(new Date()).format('DD.MM.YYYY');
  const startTimeInDate = isCurrentDay
    ? moment(` ${strDate} ${moment(new Date()).format('HH:mm')}`, 'DD.MM.YYYY HH:mm')
    : moment(` ${strDate} 8:00`, 'DD.MM.YYYY HH:mm');
  return startTimeInDate;
};

export const formatDateRange = (startTime, endTime) => {
  const startTimeStr = moment(startTime).format('MMM DD');
  const endTimeStr = moment(endTime).format('MMM DD');
  return `${startTimeStr} - ${endTimeStr}`;
};

export const formatNumber = number => String(number).replace(/(.)(?=(\d{3})+$)/g, '$1.');

export const formatDate = time => {
  return `${moment(time).format('DD MMM YYYY')} `;
};

export const formatTime = time => {
  return `${moment(time).format('h:mm A')} `;
};

export const formatDateTime = time => {
  return `${moment(time).format('h:mm A, MMM DD')} `;
};

export const formatMoney = (number, n, x) => {
  const re = `\\d(?=(\\d{${x || 3}})+${n > 0 ? '\\.' : '$'})`;
  return Number(number)
    .toFixed(Math.max(0, ~~n))
    .replace(new RegExp(re, 'g'), '$&,');
};

export const formatDurationTime = duration => {
  const minutes = duration._data.minutes < 0 ? duration._data.minutes * -1 : duration._data.minutes;
  return `${duration._data.hours} H ${minutes} MIN`;
};

export const stringToSlug = str => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();
  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};
