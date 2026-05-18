<template>
  <DataTableWidget title="프로세스 상태 변경 이력 조회">
    <!-- [슬롯 1] 검색 패널 (날짜 컴포넌트 추가) -->
    <template v-slot:search>
      <SearchPanel v-on:search="onSearch">
        <!-- 시작일 선택 -->
        <v-col cols="12" md="2">
          <v-text-field
            v-model="uiParams.fromDate"
            label="조회 시작일"
            type="date"
            density="compact"
          ></v-text-field>
        </v-col>
        <!-- 종료일 선택 -->
        <v-col cols="12" md="2">
          <v-text-field
            v-model="uiParams.toDate"
            label="조회 종료일"
            type="date"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="uiParams.processName"
            label="프로세스명"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="uiParams.port"
            label="PORT"
            type="number"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="uiParams.status"
            :items="['전체', 'RUNNING', 'DOWN', 'STARTING', 'STOPPING']"
            label="상태"
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

    <!-- [슬롯 3] 이력 데이터 테이블 -->
    <template v-slot:table>
      <BaseDataTable
        :headers="historyHeaders"
        :items="items"
        :total-items="totalItems"
        :loading="loading"
        v-on:update:options="onUpdateOptions"
      >
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getStatusColor(item.status)" size="small" variant="flat">
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:[`item.eventTime`]="{ item }">
          {{ formatDateTime(item.eventTime) }}
        </template>
        <template v-slot:[`item.startRequestTime`]="{ item }">
          {{ formatDateTime(item.startRequestTime) }}
        </template>
        <template v-slot:[`item.startTime`]="{ item }">
          {{ formatDateTime(item.startTime) }}
        </template>
        <template v-slot:[`item.endRequestTime`]="{ item }">
          {{ formatDateTime(item.endRequestTime) }}
        </template>
        <template v-slot:[`item.endTime`]="{ item }">
          {{ formatDateTime(item.endTime) }}
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
import { fetchProcessHistoryApi } from '@/api/processStatusHistory'
import { formatDateTime } from '@/utils/dateUtils'

// 화면 UI와 다이렉트로 바인딩될 reactive 객체
const uiParams = reactive({
  fromDate: '',
  toDate: '',
  processName: '',
  port: null,
  status: '전체',
})

const historyHeaders = [
  { title: '이벤트 시간', key: 'eventTime', sortable: true, width: '160px' },
  { title: 'PORT', key: 'port', width: '90px' },
  { title: '프로세스명', key: 'processName' },
  { title: '상태', key: 'status', align: 'center', width: '110px' },
  { title: 'PID', key: 'pid', width: '90px' },
  { title: '시작요청시간', key: 'startRequestTime', width: '160px' },
  { title: '시작시간', key: 'startTime', width: '160px' },
  { title: '종료요청시간', key: 'endRequestTime', width: '160px' },
  { title: '종료시간', key: 'endTime', width: '160px' },
]

const { items, totalItems, loading, loadData, updateOptions } = useDataTable(fetchProcessHistoryApi)

// 백엔드 Vo 스키마 명세에 맞추어 파라미터를 정제하는 함수
function getFormattedParams() {
  const params = {
    processName: uiParams.processName,
    port: uiParams.port,
    status: uiParams.status,
    fromEventTime: null,
    toEventTime: null,
  }

  // 시작일 처리 (시작 지점인 00:00:00 시각 추가)
  if (uiParams.fromDate) {
    params.fromEventTime = uiParams.fromDate + 'T00:00:00'
  }
  // 종료일 처리 (끝 지점인 23:59:59 시각 추가)
  if (uiParams.toDate) {
    params.toEventTime = uiParams.toDate + 'T23:59:59'
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

function getStatusColor(status) {
  if (!status) return 'grey'
  const s = status.toUpperCase()
  if (s === 'RUNNING') return 'success'
  if (s === 'DOWN') return 'error'
  if (s === 'STARTING') return 'info'
  if (s === 'STOPPING') return 'warning'
  return 'grey'
}
</script>
