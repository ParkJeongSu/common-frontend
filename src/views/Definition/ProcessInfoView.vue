<template>
  <DataTableWidget title="프로세스 기준정보 관리">
    <template v-slot:search>
      <SearchPanel v-on:search="onSearch">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="searchParams.processName"
            label="프로세스명"
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="searchParams.systemName"
            label="시스템명"
            density="compact"
          ></v-text-field>
        </v-col>
      </SearchPanel>
    </template>

    <template v-slot:actions>
      <v-btn color="primary" prepend-icon="$plus" v-on:click="onAdd">신규 등록</v-btn>
      <v-btn color="error" prepend-icon="$delete" v-on:click="onOpenDelete">삭제</v-btn>
    </template>

    <template v-slot:table>
      <BaseDataTable
        v-model="selectedRows"
        :headers="headers"
        :items="items"
        :total-items="totalItems"
        :loading="loading"
        v-on:click:row="onRowClick"
        v-on:update:options="onUpdateOptions"
      />
    </template>
  </DataTableWidget>

  <ConfirmDialog
    v-model="deleteDialog"
    :message="selectedRows.length + '개의 프로세스 정보를 삭제하시겠습니까?'"
    v-on:confirm="onDeleteConfirm"
  />
</template>

<script setup>
import { ref, reactive, markRaw } from 'vue'
import DataTableWidget from '@/components/widgets/DataTableWidget.vue'
import SearchPanel from '@/components/widgets/SearchPanel.vue'
import BaseDataTable from '@/components/common/BaseDataTable.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import ProcessInfoForm from './components/ProcessInfoForm.vue'
import { usePanelStore } from '@/stores/panelStore'
import { useDataTable } from '@/composables/useDataTable'
import { fetchProcessInfoApi, deleteProcessInfoApi } from '@/api/processInfo'

const panelStore = usePanelStore()
const selectedRows = ref([])
const deleteDialog = ref(false)

const searchParams = reactive({
  processName: '',
  systemName: '',
})

const headers = [
  { title: 'PORT', key: 'port', width: '100px' },
  { title: '시스템명', key: 'systemName' },
  { title: '그룹명', key: 'processGroupName' },
  { title: '프로세스명', key: 'processName' },
  { title: '배치파일명', key: 'batchName' },
  { title: '설명', key: 'description' },
]

const { items, totalItems, loading, loadData, updateOptions } = useDataTable(fetchProcessInfoApi)

function onSearch() {
  loadData(searchParams)
}

function onUpdateOptions(options) {
  updateOptions(options, searchParams)
}

function onAdd() {
  panelStore.setSelectedItem(null, markRaw(ProcessInfoForm), '신규 프로세스 등록', 'add')
  if (!panelStore.isOpen) panelStore.togglePanel()
}

function onOpenDelete() {
  if (selectedRows.value.length === 0) return alert('삭제할 항목을 선택해주세요.')
  deleteDialog.value = true
}

async function onDeleteConfirm() {
  try {
    await deleteProcessInfoApi(selectedRows.value)
    alert('삭제되었습니다.')
    onSearch()
  } catch (error) {
    alert('삭제 중 오류가 발생했습니다.')
  } finally {
    selectedRows.value = []
  }
}

function onRowClick(event, row) {
  panelStore.setSelectedItem(row.item, markRaw(ProcessInfoForm), '프로세스 상세 정보', 'edit')
  if (!panelStore.isOpen) panelStore.togglePanel()
}
</script>
