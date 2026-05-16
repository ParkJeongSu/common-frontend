import axios from 'axios'

// 1. Axios 인스턴스 생성
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:11401/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 2. 요청 인터셉터 (로그인 토큰 주입 등)
api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

// 3. 응답 인터셉터 (공통 에러 처리)
api.interceptors.response.use(
  function (response) {
    // API 응답 규격이 { data, total, message } 형태라고 가정
    return response.data
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      console.error('인증 오류: 로그인 페이지로 이동합니다.')
    }
    return Promise.reject(error)
  },
)

export default api
