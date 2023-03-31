import request from '@/utils/request'

/**
 * @desc 微信授权code换取accessToken
 * @param
 */
export function code2AccessToken(data) {
  return request({
    url: '/wx/loginByCode',
    method: 'post',
    data
  })
}

/**
 * @desc 获取用户信息
 * @param
 */
export function getUserInfo(params) {
  return request({
    url: '/wx/loginByCode',
    method: 'get',
    params
  })
}

/**
 * @desc 获取用户信息(个人中心)
 * @param
 */
export function getUserInfoByUid(data) {
  return request({
    url: '/oauth/v4/user/infoByUid',
    method: 'post',
    data
  })
}

/**
 * @desc 更新用户信息(个人中心)
 * @param
 */
export function updateUserInfoByUid(data) {
  return request({
    url: '/oauth/v4/user/changeInfo',
    method: 'post',
    data
  })
}
