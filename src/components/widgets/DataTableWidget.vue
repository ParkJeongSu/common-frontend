<!-- src/components/widgets/DataTableWidget.vue -->
<template>
  <v-card variant="flat" class="table-widget">
    <!-- 1. 검색 영역 슬롯 (SearchPanel 등이 들어감) -->
    <v-sheet class="search-section pa-4 mb-4" border rounded="lg">
      <slot name="search"></slot>
    </v-sheet>

    <!-- 2. 데이터 정보 및 액션 버튼 툴바 -->
    <v-toolbar density="comfortable" class="mb-2">
      <v-toolbar-title class="text-h6 font-weight-bold">
        <v-icon icon="$table" class="mr-2" color="primary"></v-icon>
        {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- 우측 상단 버튼 슬롯 (추가, 삭제, 엑셀 등) -->
      <div class="action-buttons ga-2 d-flex">
        <slot name="actions"></slot>
      </div>
    </v-toolbar>

    <!-- 3. 메인 테이블 슬롯 (BaseDataTable이 들어감) -->
    <v-card border flat rounded="lg" class="overflow-hidden">
      <slot name="table"></slot>
    </v-card>
  </v-card>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '조회 리스트',
  },
})
</script>

<style scoped>
.table-widget {
  background-color: transparent !important;
}

.search-section {
  background-color: rgb(var(--v-theme-surface));
  /* 따뜻한 초록색 테마 포인트 */
  border-left: 4px solid rgb(var(--v-theme-primary)) !important;
}

.action-buttons :deep(.v-btn) {
  text-transform: none;
  font-weight: bold;
}
</style>
