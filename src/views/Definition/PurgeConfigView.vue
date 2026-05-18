<template>
  <DataTableWidget title="데이터 삭제 정책(Purge) 관리">
    <template v-slot:search>
      <SearchPanel v-on:search="onSearch">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="searchParams.tableName"
            label="테이블명"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="searchParams.isActive"
            :items="['전체', 'Y', 'N']"
            label="활성여부"
            density="compact"
          ></v-select>
        </v-col>
      </SearchPanel>
    </template>

    <template v-slot:actions>
      <v-btn color="primary" prepend-icon="$plus" v-on:click="onAdd">신규 정책 등록</v-btn>
      <v-btn color="error" prepend-icon="$delete" v-on:click="onOpenDelete">삭제</v-btn>
    </template>

    <template v-slot:table>
      <BaseDataTable
        v-model="selectedRows"
        :headers="headers"
        :items="items"
        :total-items="totalItems"
        :loading="loading"
        item-value="id"
        v-on:click:row="onRowClick"
        v-on:update:options="onUpdateOptions"
      >
        <template v-slot:[`item.isActive`]="{ item }">
          <v-chip :color="item.isActive === 'Y' ? 'success' : 'grey'" size="small">
            {{ item.isActive === 'Y' ? '활성' : '비활성' }}
          </v-chip>
        </template>
      </BaseDataTable>
    </template>
  </DataTableWidget>

  <ConfirmDialog
    v-model="deleteDialog"
    :message="selectedRows.length + '개의 삭제 정책을 제거하시겠습니까?'"
    v-on:confirm="onDeleteConfirm"
  />
</template>

<script setup>
import { ref, reactive, markRaw } from 'vue'
import DataTableWidget from '@/components/widgets/DataTableWidget.vue'
import SearchPanel from '@/components/widgets/SearchPanel.vue'
import BaseDataTable from '@/components/common/BaseDataTable.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import PurgeConfigForm from './components/PurgeConfigForm.vue'
import { usePanelStore } from '@/stores/panelStore'
import { useDataTable } from '@/composables/useDataTable'
import { fetchPurgeConfigApi, deletePurgeConfigApi } from '@/api/purgeConfig'

const panelStore = usePanelStore()
const selectedRows = ref([])
const deleteDialog = ref(false)

const searchParams = reactive({ tableName: '', isActive: '전체' })

const headers = [
  { title: 'ID', key: 'id', width: '80px' },
  { title: 'DB명', key: 'dbName' },
  { title: '테이블명', key: 'tableName' },
  { title: '기준컬럼', key: 'targetColumnName' },
  { title: '비교값', key: 'compValue' },
  { title: '배치크기', key: 'batchSize' },
  { title: '활성', key: 'isActive', align: 'center' },
]

const { items, totalItems, loading, loadData, updateOptions } = useDataTable(fetchPurgeConfigApi)

function onSearch() {
  loadData(searchParams)
}
function onUpdateOptions(options) {
  updateOptions(options, searchParams)
}

function onAdd() {
  panelStore.setSelectedItem(null, markRaw(PurgeConfigForm), '신규 Purge 정책 등록', 'add')
  // [핵심] 성공 시 실행할 조회 함수를 스토어에 바인딩
  panelStore.onSuccess = onSearch
  panelStore.togglePanel()
}

function onRowClick(event, row) {
  panelStore.setSelectedItem(row.item, markRaw(PurgeConfigForm), 'Purge 정책 수정', 'edit')
  // [핵심] 성공 시 실행할 조회 함수를 스토어에 바인딩
  panelStore.onSuccess = onSearch
  panelStore.togglePanel()
}

function onOpenDelete() {
  if (selectedRows.value.length === 0) return alert('항목을 선택해주세요.')
  deleteDialog.value = true
}

async function onDeleteConfirm() {
  // 1. 백엔드 DTO 규격에 맞게 정수형 ID(port) 목록을 추출 (람다 없이 일반 루프 사용)
  const idList = []
  for (let i = 0; i < selectedRows.value.length; i++) {
    idList.push(selectedRows.value[i].id) // ProcessInfo는 port가 PK
  }

  // 2. 백엔드 DTO의 필드명인 'ids'와 매핑하는 객체 생성
  const payload = {
    ids: idList,
  }
  try {
    // 3. 정제된 페이로드 전달
    await deletePurgeConfigApi(payload)
    alert('삭제 완료')
    onSearch()
  } catch (error) {
    alert('삭제 처리 중 오류가 발생했습니다.')
  } finally {
    selectedRows.value = []
  }
}
</script>
