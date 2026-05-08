<!-- src/layouts/parts/TheDetailPanel.vue -->
<template>
  <v-navigation-drawer
    permanent
    location="right"
    :width="0"
    :class="{ 'panel-opened': panelStore.isOpen, 'panel-closed': !panelStore.isOpen }"
    elevation="0"
    color="transparent"
    border="none"
    class="detail-drawer"
  >
    <!-- [버튼] 카드(450px)의 바로 왼쪽에 위치하도록 설정 -->
    <v-btn
      class="drawer-toggle-btn"
      color="primary"
      variant="elevated"
      elevation="4"
      v-on:click.stop="panelStore.togglePanel"
    >
      <v-icon color="white" size="large">{{ panelStore.isOpen ? '$next' : '$prev' }}</v-icon>
    </v-btn>

    <!-- [카드] 실제 내용물 (450px) -->
    <v-card flat class="detail-card d-flex flex-column fill-height">
      <v-toolbar color="primary" density="comfortable" flat>
        <v-toolbar-title class="text-subtitle-1 font-weight-bold">
          {{ panelStore.title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon="$close" size="small" v-on:click="panelStore.closePanel"></v-btn>
      </v-toolbar>

      <v-card-text class="pa-4 bg-background flex-grow-1">
        <component
          v-if="panelStore.formComponent"
          :is="panelStore.formComponent"
          :data="panelStore.selectedItem"
        />
        <div v-else class="empty-state">
          <v-icon icon="$info" size="large" class="mb-2"></v-icon>
          <p>데이터 테이블에서 항목을 선택해주세요.</p>
        </div>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup>
import { usePanelStore } from '@/stores/panelStore'
const panelStore = usePanelStore()
</script>

<style scoped>
.detail-drawer {
  position: fixed !important;
  top: 96px !important;
  height: calc(100% - 96px) !important;
  z-index: 1000 !important;
  /* 핵심: Vuetify 레이아웃 무력화 */
  width: 0 !important;
  transition: transform 0.3s ease-in-out !important;
  overflow: visible !important;
  pointer-events: none;
}

/* 닫혔을 때: 카드 너비(450px)만큼 오른쪽으로 밀기 */
.panel-closed {
  transform: translateX(450px) !important;
}

.panel-opened {
  transform: translateX(0) !important;
}

:deep(.v-navigation-drawer__content) {
  overflow: visible !important;
  width: 0 !important; /* 내부 컨테이너도 너비 0으로 고정 */
}

.detail-card,
.drawer-toggle-btn {
  pointer-events: auto; /* 실제 클릭이 필요한 요소만 이벤트 활성화 */
}

.detail-card {
  position: absolute;
  right: 0; /* 화면 오른쪽 끝에 밀착 */
  width: 450px;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15) !important;
}

.drawer-toggle-btn {
  position: absolute;
  /* 카드(450px)보다 32px 더 왼쪽에 배치 */
  right: 450px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;

  /* [핵심 1] 넓이 강제 고정 */
  /* min-width가 기본적으로 64px 정도로 잡혀있어 width가 안 먹는 것입니다. */
  width: 32px !important; /* <--- 여기서 원하는 넓이로 마음껏 조정하세요 */
  min-width: 32px !important; /* width와 동일하게 맞춰주는 것이 가장 안전합니다 */
  max-width: 32px !important;
  padding: 0 !important;

  /* [핵심 2] 배경색이 사라지지 않게 하려면 높이를 확실히 하고 정렬을 수동으로 잡습니다. */
  height: 84px !important;

  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: visible !important;

  /* [윤곽 수정] 반원 형태를 유지하며 곡률 조정 */
  border-radius: 16px 0 0 16px !important;
  /* [가시성 수정] 경계선을 추가하여 흐릿함 방지 및 입체감 부여 */
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-right: none !important;

  cursor: pointer !important;
  background-color: #2e7d32 !important; /* 기본 primary 색상 강조 */
  transition: all 0.2s ease-in-out !important;
}

/* 호버 시 반응 */
.drawer-toggle-btn:hover {
  background-color: #1b5e20 !important;
  width: 36px !important; /* 호버 시 살짝 넓어짐 */
  min-width: 36px !important; /* width와 동일하게 맞춰주는 것이 가장 안전합니다 */
}

/* 아이콘 위치 미세 조정 (버튼이 좁아졌으므로) */
.drawer-toggle-btn .v-icon {
  margin-left: 2px;
}

/* 내부 레이어가 부모 크기를 넘지 못하게 강제 */
.drawer-toggle-btn :deep(.v-btn__content) {
  width: 100%;
  height: 100%;
  display: flex !important;
  justify-content: center !important;
}

.drawer-toggle-btn :deep(.v-btn__overlay),
.drawer-toggle-btn :deep(.v-btn__underlay) {
  width: 100% !important; /* 배경 레이어가 줄어든 너비에 딱 붙게 함 */
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #9e9e9e;
}
</style>
