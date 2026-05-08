<!-- src/views/Production/components/InventoryForm.vue -->
<template>
  <div class="form-container d-flex flex-column fill-height">
    <v-form class="flex-grow-1 overflow-y-auto pa-4">
      <v-text-field
        v-model="formData.itemCode"
        label="품목코드"
        :readonly="panelStore.mode === 'view'"
      ></v-text-field>

      <v-select
        v-model="formData.whType"
        :items="['창고A', '창고B']"
        label="창고유형"
        :readonly="panelStore.mode === 'view'"
      ></v-select>
    </v-form>

    <v-divider></v-divider>
    <!-- 액션 버튼 영역: 이제 이 폼이 직접 버튼을 관리합니다. -->
    <v-card-actions class="pa-4">
      <v-spacer></v-spacer>
      <v-btn variant="outlined" color="secondary" v-on:click="panelStore.closePanel"> 닫기 </v-btn>

      <!-- 조회 모드가 아닐 때만 저장 버튼 노출 -->
      <v-btn
        v-if="panelStore.mode !== 'view'"
        color="primary"
        variant="elevated"
        :loading="isSaving"
        v-on:click="onHandleSave"
      >
        {{ panelStore.mode === 'add' ? '등록' : '수정' }}
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { usePanelStore } from '@/stores/panelStore'
import { useBaseForm } from '@/composables/useBaseForm'
// 실제 백엔드와 통신하는 API 함수
import { saveInventoryApi } from '@/api/inventory'

const panelStore = usePanelStore()
const formData = reactive({ itemCode: '', whType: '' })
// 1. 공통 폼 엔진 가동 (API 주입)
const { isSaving, submitForm } = useBaseForm(saveInventoryApi)

// 스토어에서 데이터가 바뀌면 폼에 반영 (명시적 함수 사용)
watch(
  function () {
    return panelStore.selectedItem
  },
  function (newVal) {
    if (newVal) {
      formData.itemCode = newVal.itemCode
      formData.whType = newVal.whType
    }
  },
  { immediate: true },
)
// 저장 핸들러
async function onHandleSave() {
  const success = await submitForm(panelStore.mode, formData, function (res) {
    alert('재고 정보가 성공적으로 반영되었습니다.')
    panelStore.closePanel()
    // 부모 리스트 갱신 등 추가 작업 가능
  })
  if (success) {
    alert('정상적으로 처리되었습니다.')
    panelStore.closePanel()
    // TODO: 부모 리스트 리프레시 로직 호출 필요
  }
}
</script>

<style scoped>
.form-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
