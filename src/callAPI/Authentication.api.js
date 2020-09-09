import callAPI from "./callAPI";
import callAPIlogin from './callAPILogin'
export function LoginAPI(body) {
  return callAPIlogin("/user/login", "POST", body);
}
export function RegisterApi(body) {
  return callAPI("/user/register", "POST", body);
}
export function DecodeTokenApi(body) {
  return callAPI("/user/getinfor", "GET", null);
}
// HAHA class AuthenticationAPI {
//   login = (params) => {
//     const url = "/login";
//     return clientAPI.post(url, params);
//   };

//   logout = (params) => {
//     const url = "/logout";
//     return clientAPI.get(url, params);
//   };

//   checkLogin = (params) => {
//     const url = "/check-login";
//     return clientAPI.get(url, params);
//   };
// }

// const authenticationAPI = new AuthenticationAPI();

// export default authenticationAPI;
