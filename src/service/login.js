import Cookies from 'js-cookie';
const APP_ID = 'wl51276822a8';

export const LOGIN_KEY = 'WX_LOGIN_KEY';
const getCurUrlWithoutCode = () => window.location.href.replace(/[?&]code=[^&]*&?/g, '&').replace(/[?&]state=[^&]*&?/g, '&');
/**
 * 微信登录
 */
export const toWxLogin = () => {
  // https://developer.work.weixin.qq.com/document/path/91119
  const REDIRECT_URL = `${window.location.origin}/login?url=${encodeURIComponent(window.location.href)}`
  console.warn('REDIRECT_URL', REDIRECT_URL);
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}&response_type=code&scope=snsapi_base&agentid=1000150&state=1#wechat_redirect`;
  console.warn('重定向至', url);
  window.location.href = url;
};

/**
 * 写入登录态
 */
export const initLogin = (sid) => {
  Cookies.set(LOGIN_KEY, sid, { expires: 7 });
};

/**
 * 删除登录态
 */
export const removeLogin = () => {
  Cookies.remove(LOGIN_KEY);
};

/**
 * 检查登录态
 */
export const checkLogin = () => {
 const loginInfo = Cookies.get(LOGIN_KEY);
 return !!loginInfo;
};


export const getUserId = () => {
  return Cookies.get(LOGIN_KEY);
}