<template>
  <div class="form-container d-flex flex-column fill-height">
    <v-form class="flex-grow-1 overflow-y-auto pa-4">
      <v-row dense>
        <v-col cols="6">
          <v-text-field
            v-model="formData.id"
            label="정책 ID"
            type="number"
            :readonly="panelStore.mode === 'edit'"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select v-model="formData.isActive" :items="['Y', 'N']" label="활성 여부"></v-select>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="formData.dbName" label="데이터베이스명"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="formData.schemaName" label="스키마명"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="formData.tableName" label="대상 테이블명"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="formData.targetColumnName" label="기준 컬럼명"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="formData.dataType"
            :items="['DATE', 'NUMBER', 'STRING']"
            label="데이터 타입"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="formData.operator" label="연산자 (예: <, >=)"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="formData.compValue" label="비교 값 (Days 등)"></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="formData.batchSize" label="배치 크기" type="number"></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="formData.maxLoopCount"
            label="최대 루프"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="formData.delayMs" label="지연(ms)" type="number"></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <v-divider></v-divider>
    <v-card-actions class="pa-4">
      <v-spacer></v-spacer>
      <v-btn variant="outlined" color="secondary" v-on:click="panelStore.closePanel">닫기</v-btn>
      <v-btn color="primary" variant="elevated" :loading="isSaving" v-on:click="onHandleSave"
        >저장</v-btn
      >
    </v-card-actions>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { usePanelStore } from '@/stores/panelStore'
import { useBaseForm } from '@/composables/useBaseForm'
import { savePurgeConfigApi } from '@/api/purgeConfig'

const panelStore = usePanelStore()
const formData = reactive({
  id: null,
  dbName: '',
  schemaName: 'dbo',
  tableName: '',
  targetColumnName: '',
  dataType: 'DATE',
  operator: '<',
  compValue: '',
  batchSize: 1000,
  maxLoopCount: 10,
  delayMs: 100,
  isActive: 'Y',
})

const { isSaving, submitForm } = useBaseForm(savePurgeConfigApi)

watch(
  function () {
    return panelStore.selectedItem
  },
  function (newVal) {
    if (newVal) Object.assign(formData, newVal)
  },
  { immediate: true },
)

async function onHandleSave() {
  await submitForm(panelStore.mode, formData, function () {
    alert('반영 완료')
    panelStore.closePanel()
  })
}
</script>
