import { createI18n } from 'vue-i18n'
import ko from '@/locales/ko.json'
import en from '@/locales/en.json'

const i18n = createI18n({
  legacy: false, // Composition API를 사용하려면 false로 설정
  locale: 'ko', // 기본 언어
  fallbackLocale: 'en', // locale 설정에 문제가 있을 경우 보여질 언어
  messages: {
    ko,
    en,
  },
  // 👇 이 옵션을 추가하세요!
  // 번역 키가 존재하지 않을 때 나오는 경고를 보여주지 않습니다.
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  warnHtmlMessage: false,

  // missingWarn: false, // ⚙️ 경고 끄기 (선택)
  // fallbackWarn: false, // ⚙️ fallback 경고도 끄기 (선택)
  // 👇 이 옵션을 추가하세요!
  // 'key'를 찾지 못했을 때 이 함수가 대신 실행됩니다.
  // missing: function (locale, key) {
  //   //여기서 아무것도 하지 않으면 콘솔에 경고가 뜨지 않습니다.
  //   //필요하다면 직접 만든 로그를 남길 수도 있습니다.
  //   //console.log(`'${key}' is missing in '${locale}' locale.`)
  // },
})

export default i18n
