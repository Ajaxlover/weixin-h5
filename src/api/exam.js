import request from '@/utils/request'

/**
 * @desc 上传图片
 * @param
 */
export function uploadImage(data) {
  return request({
    url: '/upload/uploadImage',
    method: 'post',
    data
  })
}

/**
 * @desc 获取考试详情(开始参赛)
 * @param
 */
export function getContestInfo(data) {
  return request({
    url: '/exam/exam/student/getExamInfo',
    method: 'post',
    data
  })
}

/**
 * @desc 报名
 * @param
 */
export function registerJoin(data) {
  return request({
    url: '/exam/masterHeadStu/register',
    method: 'post',
    data
  })
}

/**
 * @desc 立即参赛获取考试id
 * @param
 */
export function contestBegin(data) {
  return request({
    url: '/exam/masterHeadCompete/getCompeteExam',
    method: 'post',
    data
  })
}

/**
 * @desc 获取考试id(赛前模拟)
 * @param
 */
export function contestMockBegin(data) {
  return request({
    url: '/exam/masterHeadCompete/getCompeteMock',
    method: 'post',
    data
  })
}
