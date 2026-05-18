<template>
  <div class="form-container d-flex flex-column fill-height">
    <v-form class="flex-grow-1 overflow-y-auto pa-4">
      <v-row density="comfortable">
        <v-col cols="6">
          <v-text-field
            v-model="formData.port"
            label="PORT (PK)"
            type="number"
            :readonly="panelStore.mode === 'edit'"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="formData.systemName" label="시스템명"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="formData.processGroupName" label="프로세스 그룹명"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="formData.processName" label="프로세스명"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="formData.fileName" label="실행 파일명 (jar 등)"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="formData.copyDir" label="복사 경로 (Source)"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="formData.workingDir" label="작업 경로 (Target)"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="formData.batchDir" label="배치 파일 경로"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="formData.batchName" label="배치 파일명"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="formData.description" label="프로세스 설명" rows="3"></v-textarea>
        </v-col>
      </v-row>
    </v-form>

    <v-divider></v-divider>
    <v-card-actions class="pa-4">
      <v-spacer></v-spacer>
      <v-btn variant="outlined" color="secondary" v-on:click="panelStore.closePanel">취소</v-btn>
      <v-btn color="primary" variant="elevated" :loading="isSaving" v-on:click="onHandleSave">
        {{ panelStore.mode === 'add' ? '저장' : '수정' }}
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { usePanelStore } from '@/stores/panelStore'
import { useBaseForm } from '@/composables/useBaseForm'
import { saveProcessInfoApi } from '@/api/processInfo'

const panelStore = usePanelStore()
const formData = reactive({
  port: null,
  systemName: '',
  fileName: '',
  processGroupName: '',
  processName: '',
  description: '',
  copyDir: '',
  workingDir: '',
  batchDir: '',
  batchName: '',
})

const { isSaving, submitForm } = useBaseForm(saveProcessInfoApi)

watch(
  function () {
    return panelStore.selectedItem
  },
  function (newVal) {
    if (newVal) {
      Object.assign(formData, newVal)
    }
  },
  { immediate: true },
)

async function onHandleSave() {
  const success = await submitForm(panelStore.mode, formData, function () {
    alert('정상적으로 처리되었습니다.')
    panelStore.closePanel()
    // 여기에 부모 새로고침 이벤트를 추가할 수 있습니다.
  })
}
</script>
