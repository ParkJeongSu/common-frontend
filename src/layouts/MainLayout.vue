<template>
  <v-app>
    <TheHeader />
    <TheSidebar />

    <v-main class="main-container">
      <TheMainContent />
    </v-main>

    <TheDetailPanel />
  </v-app>
</template>

<script setup>
import TheHeader from './parts/TheHeader.vue'
import TheSidebar from './parts/TheSidebar.vue'
import TheDetailPanel from './parts/TheDetailPanel.vue'
import TheMainContent from './parts/TheMainContent.vue'
// Composition API를 통한 레이아웃 로직 관리
</script>

<style scoped>
.main-container {
  /* L1(48px) + L2(48px) = 96px 상단 여백 확보 */
  padding-top: 96px !important;
  background-color: rgb(var(--v-theme-background));
  min-height: 100vh;
}
</style>
