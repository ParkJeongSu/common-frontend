// src/api/inventory.js
import api from './index'

/**
 * 재고 목록 조회 (페이징 및 검색 포함)
 */
export function fetchProcessInfoApi(params) {
  return api.get('/process-info', { params: params })
}

/**
 * 재고 데이터 저장 및 수정 (공통 함수)
 * @param {string} mode - 'add' (신규) 또는 'edit' (수정)
 * @param {object} formData - 전송할 데이터
 */
export function saveProcessInfoApi(mode, formData) {
  return api.post('/process-info', formData)
}

/**
 * 단일 재고 삭제
 */
export function deleteProcessInfoApi(ports) {
  return api.delete('/process-info', { data: ports })
}

/**
 * 다중 재고 삭제 (배치 처리)
 */
export function deleteBulkInventoryApi(ports) {
  return api.post('/process-info', { data: ports })
}
