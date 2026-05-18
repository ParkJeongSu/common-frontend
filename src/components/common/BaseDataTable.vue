<!-- src/components/common/BaseDataTable.vue -->
<template>
  <v-data-table-server
    v-model="selectedItems"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="items"
    :items-length="totalItems"
    :loading="loading"
    :density="density"
    :item-value="itemValue"
    return-object
    show-select
    class="base-data-table"
    v-on:update:options="onUpdateOptions"
  >
    <!-- [Best Practice] 슬롯을 동적으로 넘겨주어 각 화면에서 셀 내용을 커스텀할 수 있게 함 -->
    <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>

    <!-- 데이터가 없을 때 표시 -->
    <template v-slot:no-data>
      <v-alert type="warning" variant="tonal" class="ma-4"> 조회된 데이터가 없습니다. </v-alert>
    </template>
  </v-data-table-server>
</template>

<script setup>
import { ref, watch } from 'vue'

// 1. Props 정의
const props = defineProps({
  headers: { type: Array, required: true },
  items: {
    type: Array,
    default: function () {
      return []
    },
  },
  totalItems: { type: Number, default: 0 },
  loading: { type: Boolean, default: false },
  density: { type: String, default: 'compact' },
  modelValue: {
    type: Array,
    default: function () {
      return []
    },
  }, // 외부 v-model 연동
  // [추가] 테이블마다 고유한 PK 속성명을 받기 위한 프롭 (기본값은 id)
  itemValue: { type: String, default: 'id' },
})

// 2. Emits 정의
const emit = defineEmits(['update:options', 'update:modelValue'])

// 3. 내부 상태
const itemsPerPage = ref(10)
const selectedItems = ref([])

// 내부 선택 상태를 외부 v-model과 동기화
watch(
  function () {
    return selectedItems.value
  },
  function (newVal) {
    emit('update:modelValue', newVal)
  },
)

// 4. 옵션 변경 핸들러 (페이징, 정렬 등 발생 시)
function onUpdateOptions(options) {
  emit('update:options', options)
}
</script>

<style scoped>
/* 따뜻한 초록색 테마를 위한 테이블 스타일링 */
.base-data-table {
  border-top: 2px solid rgb(var(--v-theme-primary));
}

/* 헤더 배경색 및 폰트 설정 */
:deep(.v-data-table-header) {
  background-color: #f1f8e9; /* 연한 초록색 */
}

:deep(.v-data-table-header th) {
  font-weight: bold !important;
  color: #2e7d32 !important; /* 진한 초록색 */
}

/* 마우스 오버 시 색상 */
:deep(.v-data-table__tr:hover) {
  background-color: #f9fbe7 !important;
}
</style>
