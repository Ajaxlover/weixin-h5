import request from '@/utils/request'

/**
 * @desc 获取证书列表
 * @param
 */
export function getCredentialList(data) {
  return request({
    url: '/api/wechat/jsapi_ticketghjgkh',
    method: 'post',
    data
  })
}

/**
 * @desc 获取证书详情
 * @param
 */
export function getCredentialDetail(data) {
  return request({
    url: '/api/wechat/oauth/get_redirect_url',
    method: 'post',
    data
  })
}

/**
 * @desc 证书查看
 * @param
 */
export function contestCredential(data) {
  return request({
    url: '/exam/masterHead/award/lookStuAward',
    method: 'post',
    data
  })
}
