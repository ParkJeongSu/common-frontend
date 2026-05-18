// src/api/inventory.js
import api from './index'

/**
 * 재고 목록 조회 (페이징 및 검색 포함)
 */
export function fetchPurgeConfigApi(params) {
  return api.get('/purge', { params: params })
}

/**
 * 재고 데이터 저장 및 수정 (공통 함수)
 * @param {string} mode - 'add' (신규) 또는 'edit' (수정)
 * @param {object} formData - 전송할 데이터
 */
export function savePurgeConfigApi(formData) {
  return api.post('/purge', formData)
}

/**
 * 단일 재고 삭제
 */
export function deletePurgeConfigApi(formData) {
  return api.delete('/purge', { data: formData })
}

/**
 * 다중 재고 삭제 (배치 처리)
 */
export function deleteBulkInventoryApi(formData) {
  return api.delete('/purge', formData)
}
