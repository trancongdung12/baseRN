import http from './http';

export async function login(data) {
  return http.post('/mobile/auth/login', data);
}

export async function register(data) {
  return http.post('/mobile/auth/register', data);
}

// export async function userRegisterApi(data) {
//   return http.post('/auth/register', data);
// }

// export async function userLoginApi(data) {
//   return http.post('/auth/loginCustomer', data);
// }

// export async function forgotPasswordApi(email) {
//   return http.post('/auth/forgotPassword', email);
// }

// export async function userGetInfoApi() {
//   return http.get('/users/me');
// }

// export async function updateUserApi(id, data) {
//   return http.put(`users/${id}`, data);
// }

// export async function createInstallationApi(params) {
//   return http.post('/installations', params);
// }
// export async function userLoginFacebookApi(accessToken) {
//   return http.post(`/auth/loginFacebook/access_token=${accessToken}`);
// }
