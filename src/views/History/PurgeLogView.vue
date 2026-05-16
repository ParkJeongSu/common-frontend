<template>
  <DataTableWidget title="실시간 자재 재고 현황">
    <!-- [슬롯 1] 규격화된 검색 패널 사용 -->
    <template v-slot:search>
      <SearchPanel v-on:search="onSearch">
        <!-- 화면별로 다른 입력 항목만 여기에 작성 -->
        <v-col cols="12" md="3">
          <v-text-field v-model="searchParams.itemCode" label="품목코드"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="searchParams.whType"
            :items="['전체', '창고A', '창고B']"
            label="창고유형"
          ></v-select>
        </v-col>
      </SearchPanel>
    </template>

    <!-- [슬롯 2] 버튼 액션 -->
    <template v-slot:actions>
      <v-btn color="primary" prepend-icon="$plus" v-on:click="onAdd">신규 추가</v-btn>
      <v-btn color="error" prepend-icon="$delete" v-on:click="onOpenDelete">삭제</v-btn>
      <v-divider vertical class="mx-2"></v-divider>
      <v-btn color="success" prepend-icon="$fileExcel">엑셀 출력</v-btn>
    </template>

    <!-- [슬롯 3] 실제 테이블 -->
    <template v-slot:table>
      <BaseDataTable
        :headers="inventoryHeaders"
        :items="items"
        :total-items="totalItems"
        :loading="loading"
        v-on:click:row="onRowClick"
        v-on:update:options="onUpdateOptions"
      />
    </template>
  </DataTableWidget>
  <!-- 공통 삭제 확인 팝업 -->
  <ConfirmDialog
    v-model="deleteDialog"
    :message="selectedRows.length + '개의 항목을 삭제하시겠습니까?'"
    v-on:confirm="onDeleteConfirm"
  />
</template>

<script setup>
import { ref, reactive, markRaw } from 'vue'
import DataTableWidget from '@/components/widgets/DataTableWidget.vue'
import { usePanelStore } from '@/stores/panelStore'
import BaseDataTable from '@/components/common/BaseDataTable.vue'
import InventoryForm from '@/views/Production/components/InventoryForm.vue' // 별도로 만든 폼
import { useDataTable } from '@/composables/useDataTable'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
//import { fetchInventoryApi } from '@/api/inventory' // API 함수 주입

const panelStore = usePanelStore()
const selectedRows = ref([])
const deleteDialog = ref(false)

// [기능 1] 추가 버튼 클릭
function onAdd() {
  // 신규 등록 시에는 패널을 강제로 열어주는 것이 UX상 좋으므로 기존 방식 유지 가능
  panelStore.setSelectedItem(null, markRaw(InventoryForm), '신규 재고 등록', 'add')
  if (!panelStore.isOpen) panelStore.togglePanel()
}

// [기능 2] 삭제 버튼 클릭 (팝업 열기)
function onOpenDelete() {
  if (selectedRows.value.length === 0) return alert('삭제할 항목을 선택해주세요.')
  deleteDialog.value = true
}

// [기능 3] 실제 삭제 처리
function onDeleteConfirm() {
  console.log('삭제 처리 대상:', selectedRows.value)
  // API 호출 로직 추가 예정
  selectedRows.value = []
}

// [기능 4] 로우 클릭 시 (수정 모드로 패널 열기)
function onRowClick(event, row) {
  // 패널의 열림 상태를 건드리지 않고 데이터만 전송
  panelStore.setSelectedItem(
    row.item,
    markRaw(InventoryForm),
    '재고 상세 정보',
    'view', // 클릭 시에는 기본적으로 조회 모드
  )
}

// 가짜 API 함수 정의 (명시적 함수 사용)
async function fetchInventoryMock(params) {
  // 실제 네트워크 통신처럼 0.5초 대기
  await new Promise(function (resolve) {
    setTimeout(resolve, 500)
  })

  return {
    total: 2,
    data: [
      { id: 1, whName: '자재1창고', itemCode: 'ITEM-001', qty: 500 },
      { id: 2, whName: '제품A창고', itemCode: 'ITEM-002', qty: 1200 },
    ],
  }
}

// 1. 검색 파라미터 및 헤더 설정
const searchParams = reactive({ itemCode: '' })
const inventoryHeaders = [
  { title: '창고', key: 'whName' },
  { title: '품목코드', key: 'itemCode' },
  { title: '현재고', key: 'qty', align: 'end' },
]

// 2. 엔진(Composable) 가동
const { items, totalItems, loading, loadData, updateOptions } = useDataTable(fetchInventoryMock)

// 3. 핸들러 정의 (함수 사용)
function onSearch() {
  loadData(searchParams)
}

function onUpdateOptions(options) {
  updateOptions(options, searchParams)
}
</script>
