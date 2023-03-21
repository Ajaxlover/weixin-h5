import Cookies from 'js-cookie'

const KeyPrefix = 'jd-wx-h5'
const TokenKey = KeyPrefix + 'access-token'
const UserInfoKey = KeyPrefix + 'user-info'
const wxCodeKey = KeyPrefix + 'wx-code'
const UidKey = KeyPrefix + 'uid'

// token - cookie
function getToken() {
  return Cookies.get(TokenKey) ? Cookies.get(TokenKey) : false
}

function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 30 })
}

function getUserId(uid) {
  return Cookies.get(UidKey) ? Cookies.get(UidKey) : ''
}
function setUserId(uid) {
  return Cookies.set(UidKey, uid, { expires: 30 })
}

function removeUserId(uid) {
  return Cookies.remove(UidKey)
}

function removeToken() {
  return Cookies.remove(TokenKey)
}

// 用户信息 - session
function getUserInfo() {
  return ['undefined', 'null', ''].includes(Cookies.get(UserInfoKey)) ? null : Cookies.get(UserInfoKey)
}

function setUserInfo(info) {
  const origin = getUserInfo()
  let userInfo = info
  origin ? (userInfo = { ...origin, ...info }) : ''
  return Cookies.set(UserInfoKey, userInfo, { expires: 30 })
}

function removeUserInfo() {
  return Cookies.remove(UserInfoKey)
}

// 微信授权code - session
function getWxCode() {
  // return ['undefined', 'null', ''].includes(Cookies.get(wxCodeKey)) ? '' : JSON.parse(Cookies.get(wxCodeKey))
  return ['undefined', 'null', ''].includes(Cookies.get(wxCodeKey)) ? '' : Cookies.get(wxCodeKey)
}

function setWxCode(code) {
  // return Cookies.set(wxCodeKey, JSON.stringify(code))
  return Cookies.set(wxCodeKey, code)
}

function setExamRecord(key, question) {
  return localStorage.setItem(key, JSON.stringify(question))
}

function getExamRecord(key) {
  return localStorage.getItem(key) ? localStorage.getItem(key) : ''
}

function removeExamRecord(key) {
  return localStorage.removeItem(key)
}

export default {
  getToken,
  setToken,
  getUserId,
  setUserId,
  removeUserId,
  removeToken,
  getUserInfo,
  setUserInfo,
  removeUserInfo,
  getWxCode,
  setWxCode,
  setExamRecord,
  getExamRecord,
  removeExamRecord
}
