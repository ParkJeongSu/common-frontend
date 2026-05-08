<template>
  <div class="header-container">
    <!-- L1: 최상단 바 -->
    <v-app-bar color="primary" density="comfortable" elevation="0" flat>
      <v-toolbar-title class="font-weight-bold">MES SYSTEM</v-toolbar-title>
      <v-tabs
        v-model="menuStore.selectedL1"
        color="white"
        v-on:update:model-value="menuStore.selectL1"
      >
        <v-tab v-for="l1 in menuStore.menuTree" :key="l1.id" :value="l1">{{ l1.title }}</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- L2: 중메뉴 바 (여기에 토글 버튼 배치) -->
    <v-sheet color="secondary" class="l2-menu-bar d-flex align-center">
      <!-- 사이드바 토글 버튼 -->
      <v-btn icon variant="text" color="white" class="mx-2" v-on:click="menuStore.toggleSidebar">
        <v-icon>{{ menuStore.isSidebarOpen ? '$close' : '$menu' }}</v-icon>
      </v-btn>

      <v-tabs
        v-model="menuStore.selectedL2"
        color="white"
        density="compact"
        v-on:update:model-value="menuStore.selectL2"
      >
        <v-tab v-for="l2 in menuStore.currentL2List" :key="l2.id" :value="l2">{{ l2.title }}</v-tab>
      </v-tabs>
    </v-sheet>
  </div>
</template>

<script setup>
import { useMenuStore } from '@/stores/menuStore'
const menuStore = useMenuStore()
</script>

<style scoped>
.header-container {
  /* 헤더 전체가 최상위에 있도록 설정 */
  position: relative;
  z-index: 1000;
}
.l2-menu-bar {
  height: 48px;
  position: fixed;
  top: 48px; /* L1 높이만큼 떨어뜨림 */
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
