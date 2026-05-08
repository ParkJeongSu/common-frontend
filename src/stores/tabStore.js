import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTabStore = defineStore('tab', function () {
  const openTabs = ref([]) // { id, title, componentName, params } 형태
  const activeTabId = ref(null)

  // 탭 추가 또는 이동 함수
  function addTab(menuItem) {
    // 1. 이미 열려 있는지 확인
    const existingTab = openTabs.value.find(function (tab) {
      return tab.id === menuItem.id
    })

    if (existingTab) {
      // 2. 이미 있다면 해당 탭으로 활성화
      activeTabId.value = existingTab.id
    } else {
      // 3. 없다면 새로 추가
      const newTab = {
        id: menuItem.id,
        title: menuItem.title,
        componentName: menuItem.componentName, // 화면 컴포넌트 명
      }
      openTabs.value.push(newTab)
      activeTabId.value = newTab.id
    }
  }

  // 탭 닫기 함수
  function closeTab(tabId) {
    const index = openTabs.value.findIndex(function (tab) {
      return tab.id === tabId
    })
    if (index !== -1) {
      openTabs.value.splice(index, 1)
      // 닫은 탭이 현재 활성 탭이면 다른 탭으로 이동 로직 추가 필요
    }
  }

  return { openTabs, activeTabId, addTab, closeTab }
})
