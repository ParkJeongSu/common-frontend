<template>
  <v-form v-on:submit.prevent="onSearch">
    <v-row density="comfortable" align="center">
      <!-- 1. 입력 항목 슬롯 (여기에 v-text-field 등이 배치됨) -->
      <slot></slot>

      <!-- 2. 공통 검색 버튼 영역 -->
      <v-col cols="auto" class="ml-auto">
        <div class="d-flex ga-2">
          <v-btn color="primary" prepend-icon="$magnify" variant="elevated" v-on:click="onSearch">
            조회
          </v-btn>
          <!-- 필요 시 초기화 버튼 등을 슬롯으로 추가 가능 -->
          <slot name="extra-actions"></slot>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
const emit = defineEmits(['search'])

// 명시적 함수 정의
function onSearch() {
  emit('search')
}
</script>

<style scoped>
/* 검색 패널의 세부 여백 및 스타일 규격화 */
:deep(.v-text-field .v-input__details) {
  display: none; /* 검색창에서는 에러 메시지 영역 숨김 (공간 절약) */
}
</style>
