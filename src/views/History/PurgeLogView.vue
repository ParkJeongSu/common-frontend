<template>
  <DataTableWidget title="데이터 삭제(Purge) 이력 로그">
    <!-- [슬롯 1] 검색 패널 -->
    <template v-slot:search>
      <SearchPanel v-on:search="onSearch">
        <v-col cols="12" md="2">
          <v-text-field
            v-model="uiParams.fromDate"
            label="수행 시작일"
            type="date"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="uiParams.toDate"
            label="수행 종료일"
            type="date"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="uiParams.tableName"
            label="대상 테이블명"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            v-model="uiParams.status"
            :items="['전체', 'SUCCESS', 'FAIL', 'RUNNING']"
            label="수행 상태"
            density="compact"
          ></v-select>
        </v-col>
      </SearchPanel>
    </template>

    <!-- [슬롯 2] 상단 액션 버튼 -->
    <template v-slot:actions>
      <v-btn color="primary" prepend-icon="$refresh" v-on:click="onSearch">새로고침</v-btn>
      <v-divider vertical class="mx-2"></v-divider>
      <v-btn color="success" prepend-icon="$fileExcel">엑셀 출력</v-btn>
    </template>

    <!-- [슬롯 3] 로그 데이터 테이블 -->
    <template v-slot:table>
      <BaseDataTable
        :headers="logHeaders"
        :items="items"
        :total-items="totalItems"
        :loading="loading"
        v-on:update:options="onUpdateOptions"
      >
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getPurgeStatusColor(item.status)" size="small" variant="flat">
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:[`item.deleteCount`]="{ item }">
          {{ formatNumber(item.deleteCount) }} 건
        </template>

        <template v-slot:[`item.startDateTime`]="{ item }">
          {{ formatDateTime(item.startDateTime) }}
        </template>
        <template v-slot:[`item.endDateTime`]="{ item }">
          {{ formatDateTime(item.endDateTime) }}
        </template>

        <template v-slot:[`item.errorMsg`]="{ item }">
          <span :title="item.errorMsg" class="error-text-cell">
            {{ item.errorMsg || '-' }}
          </span>
        </template>
      </BaseDataTable>
    </template>
  </DataTableWidget>
</template>

<script setup>
import { reactive } from 'vue'
import DataTableWidget from '@/components/widgets/DataTableWidget.vue'
import SearchPanel from '@/components/widgets/SearchPanel.vue'
import BaseDataTable from '@/components/common/BaseDataTable.vue'
import { useDataTable } from '@/composables/useDataTable'
import { fetchPurgeLogApi } from '@/api/purgeLog'
import { formatDateTime } from '@/utils/dateUtils'

const uiParams = reactive({
  fromDate: '',
  toDate: '',
  tableName: '',
  status: '전체',
})

const logHeaders = [
  { title: '로그 ID', key: 'id', sortable: true, width: '100px' },
  { title: '설정 ID', key: 'purgeConfigId', width: '90px' },
  { title: '배치 ID', key: 'batchId', width: '130px' },
  { title: '대상 테이블', key: 'tableName' },
  { title: '시작시각', key: 'startDateTime', width: '160px' },
  { title: '종료시각', key: 'endDateTime', width: '160px' },
  { title: '삭제 건수', key: 'deleteCount', align: 'end', width: '110px' },
  { title: '상태', key: 'status', align: 'center', width: '100px' },
  { title: '에러 메시지', key: 'errorMsg', sortable: false, width: '200px' },
]

const { items, totalItems, loading, loadData, updateOptions } = useDataTable(fetchPurgeLogApi)

function getFormattedParams() {
  const params = {
    tableName: uiParams.tableName,
    status: uiParams.status,
    fromStartDateTime: null,
    toStartDateTime: null,
  }

  if (uiParams.fromDate) {
    params.fromStartDateTime = uiParams.fromDate + 'T00:00:00'
  }
  if (uiParams.toDate) {
    params.toStartDateTime = uiParams.toDate + 'T23:59:59'
  }

  return params
}

function onSearch() {
  const finalParams = getFormattedParams()
  loadData(finalParams)
}

function onUpdateOptions(options) {
  const finalParams = getFormattedParams()
  updateOptions(options, finalParams)
}

function getPurgeStatusColor(status) {
  if (!status) return 'grey'
  const s = status.toUpperCase()
  if (s === 'SUCCESS') return 'success'
  if (s === 'FAIL' || s === 'ERROR') return 'error'
  if (s === 'RUNNING') return 'info'
  return 'grey'
}

function formatNumber(value) {
  if (value === null || value === undefined) return '0'
  return value.toLocaleString()
}
</script>

<style scoped>
.error-text-cell {
  display: block;
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(var(--v-theme-error));
}
</style>
