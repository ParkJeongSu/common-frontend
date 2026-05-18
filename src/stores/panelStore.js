// src/stores/panelStore.js
import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'

export const usePanelStore = defineStore('panel', function () {
  const isOpen = ref(false)
  const selectedItem = ref(null)
  const formComponent = shallowRef(null)
  const title = ref('상세 정보')
  const mode = ref('view')
  const onSuccess = ref(null)

  // 1. 데이터만 설정하는 함수 (행 클릭 시 호출)
  function setSelectedItem(item, component, panelTitle, targetMode) {
    selectedItem.value = item
    formComponent.value = component
    title.value = panelTitle || '상세 정보'
    mode.value = targetMode || 'view'
  }

  // 2. 패널 상태만 토글하는 함수 (버튼 클릭 시 호출)
  function togglePanel() {
    isOpen.value = !isOpen.value
  }

  function closePanel() {
    isOpen.value = false
    // [중요] 패널이 닫힐 때 다른 화면의 콜백과 꼬이지 않도록 깔끔하게 청소합니다.
    onSuccess.value = null
  }

  return {
    isOpen,
    selectedItem,
    formComponent,
    title,
    mode,
    onSuccess,
    setSelectedItem,
    togglePanel,
    closePanel,
  }
})
