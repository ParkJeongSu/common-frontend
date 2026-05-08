<template>
  <v-navigation-drawer
    v-model="menuStore.isSidebarOpen"
    :width="260"
    class="sidebar-drawer"
    elevation="1"
  >
    <v-list-item class="bg-light-green-lighten-5">
      <v-list-item-title class="font-weight-bold">
        {{ menuStore.selectedL2 ? menuStore.selectedL2.title : '메뉴를 선택하세요' }}
      </v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="l3 in menuStore.currentL3List"
        :key="l3.id"
        color="primary"
        v-on:click="onMenuClick(l3)"
      >
        <v-list-item-title>{{ l3.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useMenuStore } from '@/stores/menuStore'
import { useTabStore } from '@/stores/tabStore'

const menuStore = useMenuStore()
const tabStore = useTabStore()

function onMenuClick(menuItem) {
  tabStore.addTab(menuItem)
}
</script>

<style scoped>
.sidebar-drawer {
  /* L1(48px) + L2(48px) = 96px 만큼 위에서 떨어져야 함 */
  top: 96px !important;
  height: calc(100% - 96px) !important;
}
</style>
