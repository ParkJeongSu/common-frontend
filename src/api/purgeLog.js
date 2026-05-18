// src/api/inventory.js
import api from './index'

/**
 * PurgeLog 목록 조회 (페이징 및 검색 포함)
 */
export function fetchPurgeLogApi(params) {
  return api.get('/purge/history', { params: params })
}
