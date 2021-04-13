import * as Yup from 'yup';
import { translate } from '../i18n';

export const loginSchema = Yup.object({
  email: Yup.string().email(translate('emailInvalid')).required(translate('emailRequired')),
  password: Yup.string()
    .min(6, translate('passwordMin'))
    .max(20, translate('passwordMax'))
    .required(translate('passwordRequired')),
});

export const registerSchema = Yup.object({
  email: Yup.string().email(translate('emailInvalid')).required(translate('emailRequired')),
  password: Yup.string()
    .min(6, translate('passwordMin'))
    .max(20, translate('passwordMax'))
    .required(translate('passwordRequired')),
});
