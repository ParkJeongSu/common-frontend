import { defineAsyncComponent } from 'vue'

export const componentMap = {
  // 사용자가 탭을 클릭하는 순간에 해당 파일을 서버에서 가져옵니다.
  // DailyPlanView: defineAsyncComponent(function () {
  //   return import('@/views/Production/DailyPlanView.vue')
  // }),
  // InventoryListView: defineAsyncComponent(function () {
  //   return import('@/views/Production/InventoryListView.vue')
  // }),
  ProcessStatusView: defineAsyncComponent(function () {
    return import('@/views/Production/ProcessStatusView.vue')
  }),
  PurgeConfigView: defineAsyncComponent(function () {
    return import('@/views/Definition/PurgeConfigView.vue')
  }),
  ProcessInfoView: defineAsyncComponent(function () {
    return import('@/views/Definition/ProcessInfoView.vue')
  }),
  PurgeLogView: defineAsyncComponent(function () {
    return import('@/views/History/PurgeLogView.vue')
  }),
  ProcessStatusHistoryView: defineAsyncComponent(function () {
    return import('@/views/History/ProcessStatusHistoryView.vue')
  }),
}
