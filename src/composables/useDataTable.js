// src/composables/useDataTable.js
import { ref, reactive } from 'vue'

/**
 * @param {Function} fetchApi - 데이터를 가져올 API 함수
 */
export function useDataTable(fetchApi) {
  // 1. 상태 정의
  const items = ref([])
  const totalItems = ref(0)
  const loading = ref(false)

  // 페이징 및 정렬 옵션 (Vuetify v-data-table-server 규격)
  const options = reactive({
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
  })

  // 2. 데이터 로드 함수 (명시적 함수 사용)
  async function loadData(searchParams) {
    // 이미 로딩 중이면 중복 호출 방지
    if (loading.value) return

    loading.value = true
    try {
      // API 호출 시 페이징 정보와 검색 조건을 함께 전달
      const params = {
        page: options.page,
        limit: options.itemsPerPage,
        sortBy: options.sortBy.length > 0 ? options.sortBy[0].key : null,
        sortOrder: options.sortBy.length > 0 ? options.sortBy[0].order : null,
        ...searchParams,
      }

      const response = await fetchApi(params)

      // API 응답 구조에 맞게 데이터 매핑 (예: { data: [], total: 100 })
      items.value = response.content || []
      totalItems.value = response.page.totalElements || 0
    } catch (error) {
      console.error('데이터 조회 중 오류 발생:', error)
      items.value = []
      totalItems.value = 0
    } finally {
      loading.value = false
    }
  }

  // 3. 옵션 변경 핸들러
  function updateOptions(newOptions, searchParams) {
    options.page = newOptions.page
    options.itemsPerPage = newOptions.itemsPerPage
    options.sortBy = newOptions.sortBy

    // 옵션이 바뀌면 자동으로 데이터 재조회
    loadData(searchParams)
  }

  return {
    items,
    totalItems,
    loading,
    options,
    loadData,
    updateOptions,
  }
}
