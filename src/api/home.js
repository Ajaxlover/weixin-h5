import request from '@/utils/request'

/**
 * @desc 获取首页竞赛列表
 * @param
 */
export function getContestList(data) {
  return request({
    url: '/exam/masterHead/stu/getList',
    method: 'post',
    data
  })
}

/**
 * @desc 获取我的竞赛列表
 * @param
 */
export function getMyContestList(data) {
  return request({
    url: '/api/wechat/oauth/get_redirect_url',
    method: 'post',
    data
  })
}

/**
 * @desc 获取竞赛详情（去报名）
 * @param
 */
export function getContestDetail(data) {
  return request({
    url: '/exam/masterHeadStu/getStuRegistrationInfo',
    method: 'post',
    data
  })
}
