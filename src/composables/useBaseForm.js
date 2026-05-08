// src/composables/useBaseForm.js
import { ref } from 'vue'

/**
 * @param {Function} saveApi - 저장/수정을 처리할 API 함수
 */
export function useBaseForm(saveApi) {
  const isSaving = ref(false)

  // 공통 저장 로직
  async function submitForm(mode, formData, successCallback) {
    if (isSaving.value) return

    isSaving.value = true
    try {
      // 주입받은 API를 사용하여 전송
      const response = await saveApi(mode, formData)

      if (response && successCallback) {
        successCallback(response)
      }
      return true
    } catch (error) {
      console.error('Form 처리 중 오류 발생:', error)
      return false
    } finally {
      isSaving.value = false
    }
  }

  return {
    isSaving,
    submitForm,
  }
}
