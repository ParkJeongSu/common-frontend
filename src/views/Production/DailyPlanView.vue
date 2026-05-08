<template>
  <v-card flat class="content-card">
    <v-card-title class="text-h5 font-weight-bold">
      <v-icon icon="$calendarCheck" class="mr-2" color="primary"></v-icon>
      일일 생산계획 수립
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-alert type="success" variant="tonal" border="start">
        생산 라인별 일일 계획을 설정하는 화면입니다. (Test Page 01)
      </v-alert>
      <v-table class="mt-4">
        <thead>
          <tr>
            <th>라인명</th>
            <th>목표량</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Line-A</td>
            <td>1,200</td>
            <td><v-chip size="small" color="success">정상</v-chip></td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
// 특별한 로직 없이 화면 확인용으로 구성
</script>

<style scoped>
.content-card {
  border-radius: 12px;
}
</style>
