import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMenuStore = defineStore('menu', function () {
  // 1. 임시 메뉴 데이터 (L1 -> L2 -> L3)
  const menuTree = ref([
    {
      id: 'MANAGER',
      title: '운영관리',
      children: [
        {
          id: 'STATUS',
          title: '상태관리',
          children: [
            { id: 'PROCESS_STATUS', title: '프로세스 상태', componentName: 'ProcessStatusView' },
          ],
        },
        {
          id: 'DEFINITION',
          title: '기준정보',
          children: [
            { id: 'PURGE_DEF', title: 'Purge 설정', componentName: 'PurgeConfigView' },
            { id: 'PROCESS_INFO', title: '프로세스 정보', componentName: 'ProcessInfoView' },
          ],
        },
      ],
    },
    {
      id: 'HISTORY',
      title: '이력조회',
      children: [
        {
          id: 'HIST_SUB',
          title: '이력관리',
          children: [
            { id: 'PURGE_LOG', title: 'Purge 로그', componentName: 'PurgeLogView' },
            { id: 'PROC_HIST', title: '프로세스 이력', componentName: 'ProcessStatusHistoryView' },
          ],
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
