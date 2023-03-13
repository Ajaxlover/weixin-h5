import request from '@/utils/request'

/**
 * @desc 微信验签(sdk用) 生成signature timestamp nonce_str 等
 * @param
 */
export function wxSign(data) {
  return request({
    url: '/wx/createJsSignature',
    method: 'post',
    data
  })
}

/**
 * @desc 获取微信授权地址(授权用)
 * @param
 */
export function wxRedirectUrl(data) {
  return request({
    url: '/wx/getAuthorizationUrl',
    method: 'post',
    data
  })
}
