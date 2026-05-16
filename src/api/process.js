// src/api/inventory.js
import api from './index'

/**
 * 재고 목록 조회 (페이징 및 검색 포함)
 */
export function fetchProcessApi(params) {
  return api.get('/process/list', { params: params })
}

/**
 * 재고 데이터 저장 및 수정 (공통 함수)
 * @param {string} mode - 'add' (신규) 또는 'edit' (수정)
 * @param {object} formData - 전송할 데이터
 */
export function controlProcessApi(portId, mode, formData) {
  if (mode === 'start') {
    // 신규 등록: POST 요청
    return api.post('/process/' + portId + '/' + mode, formData)
  } else if (mode === 'stop') {
    // 기존 수정: PUT 요청 (id값은 formData 내부에 있다고 가정)
    return api.post('/process/' + portId + '/' + mode, formData)
  }
}

/**
 * 단일 재고 삭제
 */
export function deleteInventoryApi(id) {
  return api.delete('/inventory/' + id)
}

/**
 * 다중 재고 삭제 (배치 처리)
 */
export function deleteBulkInventoryApi(ids) {
  return api.post('/inventory/delete-bulk', { ids: ids })
}
