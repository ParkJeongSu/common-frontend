<template>
  <div class="tab-wrapper">
    <!-- 탭 상단바 -->
    <v-tabs v-model="tabStore.activeTabId" color="primary" align-tabs="start">
      <v-tab v-for="tab in tabStore.openTabs" :key="tab.id" :value="tab.id">
        {{ tab.title }}
        <v-btn
          icon="$close"
          variant="text"
          size="x-small"
          class="ml-2"
          v-on:click.stop="tabStore.closeTab(tab.id)"
        ></v-btn>
      </v-tab>
    </v-tabs>

    <!-- 탭 내용 영역 -->
    <v-window v-model="tabStore.activeTabId" class="pa-4">
      <v-window-item v-for="tab in tabStore.openTabs" :key="tab.id" :value="tab.id">
        <keep-alive>
          <component :is="getComponent(tab.componentName)" />
        </keep-alive>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup>
import { useTabStore } from '@/stores/tabStore'
// 실제 화면 컴포넌트들을 미리 임포트하거나 비동기로 등록
import { componentMap } from '@/utils/componentRegistry' // 매핑 파일만 임포트

const tabStore = useTabStore()

// 컴포넌트 매핑 함수
function getComponent(name) {
  return componentMap[name] || null
}
</script>

<style scoped>
.tab-wrapper {
  display: flex;
  flex-direction: column;
}
</style>
