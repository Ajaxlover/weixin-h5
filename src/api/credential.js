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
 * @desc 获取竞赛详情（去报名）
 * @param
 */
export function getCredentialDetail(data) {
  return request({
    url: '/api/wechat/oauth/get_redirect_url',
    method: 'post',
    data
  })
}
