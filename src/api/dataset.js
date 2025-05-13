import request from '@/utils/request'

/**
 * 获取数据集信息
 * @param {Object} params 请求参数
 * @param {string} params.datasetId 数据集ID
 * @returns {Promise} 返回请求Promise
 */
export function getDatasetInfo(params) {
  return request({
    url: '/api/dataset/info',
    method: 'get',
    params
  })
}

/**
 * 获取样本组列表
 * @param {Object} params 请求参数
 * @param {string} params.datasetId 数据集ID
 * @returns {Promise} 返回请求Promise
 */
export function getSampleGroups(params) {
  return request({
    url: '/api/dataset/sampleGroups',
    method: 'get',
    params
  })
}

/**
 * 获取比较列表
 * @param {Object} params 请求参数
 * @param {string} params.datasetId 数据集ID
 * @returns {Promise} 返回请求Promise
 */
export function getComparisons(params) {
  return request({
    url: '/api/dataset/comparisons',
    method: 'get',
    params
  })
}

/**
 * 下载数据集
 * @param {Object} params 请求参数
 * @param {string} params.datasetId 数据集ID
 * @returns {Promise} 返回请求Promise
 */
export function downloadDataset(params) {
  return request({
    url: '/api/dataset/download',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

/**
 * 从数据管理器中移除数据集
 * @param {Object} data 请求数据
 * @param {string} data.datasetId 数据集ID
 * @returns {Promise} 返回请求Promise
 */
export function removeFromDataManager(data) {
  return request({
    url: '/api/dataset/removeFromManager',
    method: 'post',
    data
  })
}

/**
 * 创建样本组
 * @param {Object} data 请求数据
 * @returns {Promise} 返回请求Promise
 */
export function createSampleGroup(data) {
  return request({
    url: '/api/dataset/sampleGroup',
    method: 'post',
    data
  })
}

/**
 * 创建对比组
 * @param {Object} data 请求数据
 * @returns {Promise} 返回请求Promise
 */
export function createComparison(data) {
  return request({
    url: '/api/dataset/comparison',
    method: 'post',
    data
  })
} 