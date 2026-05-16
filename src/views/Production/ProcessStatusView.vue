<template>
  <DataTableWidget title="프로세스 실시간 상태 모니터링">
    <!-- [슬롯 1] 검색 패널 -->
    <template v-slot:search>
      <SearchPanel v-on:search="onSearch">
        <v-col cols="12" md="3">
          <v-text-field
            v-model="searchParams.systemName"
            label="시스템명"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="searchParams.processName"
            label="프로세스명"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="searchParams.status"
            :items="['전체', 'RUNNING', 'STOPPED', 'STARTING', 'ERROR']"
            label="상태"
            density="compact"
          ></v-select>
        </v-col>
      </SearchPanel>
    </template>

    <!-- [슬롯 2] 버튼 액션 (상단 공통 버튼) -->
    <template v-slot:actions>
      <!-- 자동 새로고침 설정 영역 -->
      <div class="d-flex align-center mr-4">
        <v-switch
          v-model="isAutoRefresh"
          label="자동 갱신"
          color="primary"
          hide-details
          density="compact"
          class="mr-2"
        ></v-switch>
        <v-chip v-if="isAutoRefresh" size="small" variant="outlined" color="primary" label>
          {{ remainingTime }}초 후 갱신
        </v-chip>
      </div>
      <v-btn color="primary" prepend-icon="$refresh" v-on:click="manualSearch">새로고침</v-btn>
      <v-divider vertical class="mx-2"></v-divider>
      <v-btn color="success" prepend-icon="$fileExcel">엑셀 출력</v-btn>
    </template>

    <!-- [슬롯 3] 실제 테이블 -->
    <template v-slot:table>
      <BaseDataTable
        :headers="statusHeaders"
        :items="items"
        :total-items="totalItems"
        :loading="loading"
        v-on:update:options="onUpdateOptions"
      >
        <!-- 상태 컬럼 커스텀 (Badge 적용) -->
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getStatusColor(item.status)" size="small" variant="flat">
            {{ item.status }}
          </v-chip>
        </template>
        <!-- 시간 컬럼 4종 세트 포맷팅 적용 -->
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

        <!-- 시작 버튼 컬럼 -->
        <template v-slot:[`item.startAction`]="{ item }">
          <v-btn
            v-if="isControllable(item.processName)"
            icon="$play"
            variant="text"
            color="success"
            size="small"
            :disabled="!isStatus(item.status, 'DOWN')"
            v-on:click="onStartProcess(item)"
          ></v-btn>
        </template>

        <!-- 정지 버튼 컬럼 -->
        <template v-slot:[`item.stopAction`]="{ item }">
          <v-btn
            v-if="isControllable(item.processName)"
            icon="$stop"
            variant="text"
            color="error"
            size="small"
            :disabled="!isStatus(item.status, 'RUNNING')"
            v-on:click="onStopProcess(item)"
          ></v-btn>
        </template>
      </BaseDataTable>
    </template>
  </DataTableWidget>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue'
import DataTableWidget from '@/components/widgets/DataTableWidget.vue'
import SearchPanel from '@/components/widgets/SearchPanel.vue'
import BaseDataTable from '@/components/common/BaseDataTable.vue'
import { useDataTable } from '@/composables/useDataTable'
import { fetchProcessApi, controlProcessApi } from '@/api/process' // API 함수 주입
import { formatDateTime } from '@/utils/dateUtils'

// --- 자동 새로고침 관련 상태 ---
const isAutoRefresh = ref(true) // 토글 상태 (기본 켬)
const remainingTime = ref(30) // 남은 시간 (초)
const REFRESH_INTERVAL = 30 // 상수: 갱신 주기
let timer = null // 타이머 객체 변수

// 1. 검색 파라미터 및 테이블 헤더 설정
const searchParams = reactive({
  systemName: '',
  processName: '',
  status: '전체',
})

const statusHeaders = [
  { title: 'PORT', key: 'port', align: 'start', sortable: true },
  { title: '시스템', key: 'systemName' },
  { title: '그룹', key: 'processGroupName' },
  { title: '프로세스명', key: 'processName' },
  { title: '상태', key: 'status', align: 'center' },
  { title: 'PID', key: 'pid' },
  { title: '시작요청시간', key: 'startRequestTime' },
  { title: '시작시간', key: 'startTime' },
  { title: '종료요청시간', key: 'endRequestTime' },
  { title: '종료시간', key: 'endTime' },
  { title: '시작', key: 'startAction', align: 'center', sortable: false },
  { title: '정지', key: 'stopAction', align: 'center', sortable: false },
]

// 3. Composable 연결
const { items, totalItems, loading, loadData, updateOptions } = useDataTable(fetchProcessApi)

// 4. 비즈니스 로직 함수 정의 (명시적 함수 선언 방식)

// 타이머 시작 함수 (1초마다 수행)
function startTimer() {
  stopTimer() // 중복 실행 방지
  timer = setInterval(function () {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      // 0초가 되면 검색 실행 및 시간 초기화
      onSearch()
      remainingTime.value = REFRESH_INTERVAL
    }
  }, 1000)
}

// 타이머 정지 함수
function stopTimer() {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

// 수동 새로고침 클릭 시 (시간 초기화 포함)
function manualSearch() {
  onSearch()
  if (isAutoRefresh.value) {
    remainingTime.value = REFRESH_INTERVAL
  }
}

// 제어 가능 여부 체크 (특정 프로세스명 제외 로직)
function isControllable(processName) {
  // 예: 'SystemMonitor', 'ProcessManager' 등의 이름을 가진 프로세스는 제어 불가
  const protectedProcesses = ['GAL', 'MANTI']
  let canControl = true

  for (let i = 0; i < protectedProcesses.length; i++) {
    if (processName === protectedProcesses[i]) {
      canControl = false
      break
    }
  }
  return canControl
}

/**
 * 상태 비교 유틸리티 함수 (명시적 함수 정의)
 * @param {string} currentStatus - 현재 데이터의 상태값
 * @param {string} targetStatus - 비교하고자 하는 대상 상태 (대문자)
 */
function isStatus(currentStatus, targetStatus) {
  if (!currentStatus) {
    return false
  }
  return currentStatus.toUpperCase() === targetStatus
}

// 상태별 색상 반환
function getStatusColor(status) {
  if (!status) return 'grey'

  const s = status.toUpperCase()
  if (s === 'RUNNING') return 'success' // Running
  if (s === 'DOWN') return 'error' // Down
  if (s === 'STARTING') return 'info' // Starting
  if (s === 'STOPPING') return 'warning' // Stopping

  return 'grey'
}

// 시작 명령 전송
async function onStartProcess(item) {
  if (!confirm(item.processName + '을(를) 시작하시겠습니까?')) return

  try {
    await controlProcessApi(item.port, 'start', { port: item.port })
    alert('시작 명령을 전달했습니다.')
    onSearch() // 목록 새로고침
  } catch (error) {
    alert('명령 전송 중 오류가 발생했습니다.')
  }
}

// 정지 명령 전송
async function onStopProcess(item) {
  if (!confirm(item.processName + '을(를) 정지하시겠습니까?')) return

  try {
    await controlProcessApi(item.port, 'stop', { port: item.port })
    alert('정지 명령을 전달했습니다.')
    onSearch() // 목록 새로고침
  } catch (error) {
    alert('명령 전송 중 오류가 발생했습니다.')
  }
}

function onSearch() {
  loadData(searchParams)
}

function onUpdateOptions(options) {
  updateOptions(options, searchParams)
}

// 토글(Switch) 상태 감시
watch(isAutoRefresh, function (newVal) {
  if (newVal) {
    remainingTime.value = REFRESH_INTERVAL
    startTimer()
  } else {
    stopTimer()
  }
})

// 2. 생명주기에 따른 타이머 제어
onMounted(function () {
  if (isAutoRefresh.value) {
    startTimer()
  }
})

onBeforeUnmount(function () {
  // 다른 화면으로 이동하거나 컴포넌트가 파괴될 때 타이머 해제 (메모리 누수 방지)
  stopTimer()
})
</script>
