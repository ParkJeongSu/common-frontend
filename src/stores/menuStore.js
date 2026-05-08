import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMenuStore = defineStore('menu', function () {
  // 1. 임시 메뉴 데이터 (L1 -> L2 -> L3)
  const menuTree = ref([
    {
      id: 'PROD',
      title: '생산관리',
      children: [
        {
          id: 'PROD_PLAN',
          title: '생산계획',
          children: [
            { id: 'MENU_01', title: '일일계획수립', componentName: 'DailyPlanView' },
            { id: 'MENU_02', title: '주간계획현황', componentName: 'InventoryListView' },
          ],
        },
        {
          id: 'PROD_EXEC',
          title: '생산실적',
          children: [
            { id: 'MENU_03', title: '공정별실적등록', componentName: 'ProcessResultView' },
          ],
        },
      ],
    },
    {
      id: 'QUAL',
      title: '품질관리',
      children: [
        {
          id: 'QUAL_INSP',
          title: '검사관리',
          children: [{ id: 'MENU_04', title: '수입검사등록', componentName: 'IncomingInspView' }],
        },
      ],
    },
  ])

  const selectedL1 = ref(menuTree.value[0])
  const selectedL2 = ref(null) // 초기에는 중메뉴 선택 안 됨
  const currentL3List = ref([]) // 소메뉴는 명시적으로 호출될 때만 업데이트
  const isSidebarOpen = ref(true) // 사이드바 토글 상태

  // 3. 중메뉴(L2) 목록 계산
  const currentL2List = computed(function () {
    return selectedL1.value ? selectedL1.value.children : []
  })

  // 대메뉴 선택: 중메뉴 리스트만 바뀜 (소메뉴는 유지)
  function selectL1(menu) {
    selectedL1.value = menu
    // 중메뉴는 선택 해제하여 사용자가 새로 고르게 유도
    selectedL2.value = null
  }

  // 중메뉴 선택: 이때 비로소 소메뉴 리스트가 바뀜
  function selectL2(menu) {
    selectedL2.value = menu
    currentL3List.value = menu.children || []
  }

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  return {
    menuTree,
    selectedL1,
    selectedL2,
    currentL3List,
    currentL2List,
    isSidebarOpen,
    selectL1,
    selectL2,
    toggleSidebar,
  }
})
