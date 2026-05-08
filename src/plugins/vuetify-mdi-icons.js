// vuetify의 mdi-svg 설정과 사용할 아이콘을 @mdi/js에서 직접 가져옵니다.
// https://pictogrammers.com/library/mdi/
import { mdi } from 'vuetify/iconsets/mdi-svg'
import {
  mdiHome,
  mdiAccount,
  mdiLock,
  mdiWeb,
  mdiEye,
  mdiEyeOff,
  mdiMenuDown,
  mdiMenuOpen,
  mdiClose,
  mdiArrowUp,
  mdiArrowDown,
  mdiChevronDown,
  mdiChevronLeft,
  mdiChevronRight,
  mdiCheck,
  mdiAlertCircle,
  mdiInformation,
  mdiAlert,
  mdiDelete,
  mdiCancel,
  mdiAccountCircle,
  mdiMenu,
  mdiBullseyeArrow,
  mdiChartLine,
  mdiProgressCheck,
  mdiPackageVariant,
  mdiViewDashboard,
  mdiLogout,
  mdiBellOutline,
  mdiPlus,
  mdiPencil,
  mdiMagnify,
  mdiAccountGroup,
  mdiAccountMultiple,
  mdiChartBar,
  mdiChevronUp,
  mdiCheckboxBlankOutline,
  mdiPageFirst,
  mdiPageLast,
  mdiAccountLock,
  mdiTranslate,
  mdiWeatherNight,
  mdiWeatherSunny,
  mdiAccountKey,
  mdiMinusBox,
  mdiFileExportOutline,
  mdiFileImportOutline,
  mdiFullscreen,
  mdiFullscreenExit,
  mdiChartSankey,
  mdiChartScatterPlot,
  mdiRadar,
  mdiChartTimeline,
  mdiChartDonut,
  mdiAlarm,
  mdiDevices,
  mdiImport,
  mdiTrainCarFlatbed,
  mdiHistory,
  mdiStateMachine,
  mdiTransfer,
  mdiBankTransferIn,
  mdiBankTransferOut,
  mdiTransitTransfer,
  mdiListStatus,
  mdiDatabaseOutline,
  mdiHandFrontRightOutline,
  mdiCogSyncOutline,
  mdiTextAccount,
  mdiAlarmPanel,
  mdiAccountConvert,
  mdiEmailOutline,
  mdiFormatListBulleted,
  mdiController,
  mdiInformationOutline,
  mdiMapMarkerOutline,
  mdiTruckDeliveryOutline,
  mdiTagOutline,
  mdiMapMarkerPath,
  mdiRobotIndustrial,
  mdiClockOutline,
  mdiSend,
  mdiCalendarCheck, // 추가 필요
  mdiTable, // 추가 필요
  mdiFileExcel, // 추가 필요
} from '@mdi/js'

// 아이콘 별칭(alias)을 만듭니다.
const aliases = {
  // '별칭' : '실제 아이콘 데이터'
  home: mdiHome,
  account: mdiAccount,
  lock: mdiLock,
  web: mdiWeb,
  eye: mdiEye,
  eyeOff: mdiEyeOff,
  dropdown: mdiMenuDown, // <--- 여기에 추가
  clear: mdiClose, // clearable v-text-field
  sortAsc: mdiArrowUp, // v-data-table 정렬
  sortDesc: mdiArrowDown, // v-data-table 정렬
  expand: mdiChevronDown, // v-expansion-panel
  prev: mdiChevronLeft, // v-pagination, v-carousel
  next: mdiChevronRight, // v-pagination, v-carousel
  checkboxOn: mdiCheck, // v-checkbox
  info: mdiInformation, // v-alert
  success: mdiCheck, // v-alert
  warning: mdiAlert, // v-alert
  error: mdiAlertCircle, // v-alert
  delete: mdiDelete, // (자주 사용)
  cancel: mdiCancel, // (자주 사용)
  close: mdiClose, // (자주 사용)
  accountCircle: mdiAccountCircle,
  menu: mdiMenu,
  bullseyeArrow: mdiBullseyeArrow,
  chartLine: mdiChartLine,
  progressCheck: mdiProgressCheck,
  packageVariant: mdiPackageVariant,
  chevronLeft: mdiChevronLeft,
  dashboard: mdiViewDashboard,
  logout: mdiLogout,
  bellOutline: mdiBellOutline,
  plus: mdiPlus,
  pencil: mdiPencil,
  magnify: mdiMagnify,
  accountGroup: mdiAccountGroup,
  accountMultiple: mdiAccountMultiple,
  chartBar: mdiChartBar,
  collapse: mdiChevronUp,
  checkboxOff: mdiCheckboxBlankOutline, // v-checkbox의 체크 안된 상태
  first: mdiPageFirst, // v-pagination의 맨 처음 페이지
  last: mdiPageLast, // v-pagination의 맨 마지막 페이지
  accountLock: mdiAccountLock, // 잠긴 사용자 계정
  translate: mdiTranslate, // 번역 아이콘
  weatherNight: mdiWeatherNight, // 다크 모드 아이콘
  weatherSunny: mdiWeatherSunny, // 라이트 모드 아이콘
  accountKey: mdiAccountKey, // 비밀번호 아이콘
  checkboxIndeterminate: mdiMinusBox, // v-checkbox의 중간 상태
  fileExport: mdiFileExportOutline, // 파일 내보내기 아이콘
  fileImport: mdiFileImportOutline, // 파일 가져오기 아이콘
  fullscreen: mdiFullscreen, // 전체화면 아이콘
  fullscreenExit: mdiFullscreenExit, // 전체화면 종료 아이콘
  // [추가] 요청된 차트 아이콘
  chartSankey: mdiChartSankey,
  chartScatter: mdiChartScatterPlot,
  radar: mdiRadar,
  chartTimeline: mdiChartTimeline,
  chartDonut: mdiChartDonut,
  alarm: mdiAlarm,
  device: mdiDevices,
  import: mdiImport,
  trainCarFlatbed: mdiTrainCarFlatbed,
  history: mdiHistory,
  stateMachine: mdiStateMachine,
  transfer: mdiTransfer,
  bankTransferIn: mdiBankTransferIn,
  bankTransferOut: mdiBankTransferOut,
  transitTransfer: mdiTransitTransfer,
  listStatus: mdiListStatus,
  databaseOutline: mdiDatabaseOutline,
  handFrontRightOutline: mdiHandFrontRightOutline,
  cogSyncOutline: mdiCogSyncOutline,
  textAccount: mdiTextAccount,
  alarmPanel: mdiAlarmPanel,
  accountConvert: mdiAccountConvert,
  emailOutline: mdiEmailOutline,
  formatListBulleted: mdiFormatListBulleted,
  controller: mdiController,
  informationOutline: mdiInformationOutline,
  mapMarkerOutline: mdiMapMarkerOutline,
  truckDeliveryOutline: mdiTruckDeliveryOutline,
  tagOutline: mdiTagOutline,
  mapMarkerPath: mdiMapMarkerPath,
  robotIndustrial: mdiRobotIndustrial,
  clockOutline: mdiClockOutline,
  send: mdiSend,
  menuOpen: mdiMenuOpen,
  calendarCheck: mdiCalendarCheck,
  table: mdiTable,
  fileExcel: mdiFileExcel,
}

// 설정들을 export 합니다.
export { aliases, mdi }
