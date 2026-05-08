<!-- src/components/common/ConfirmDialog.vue -->
<template>
  <v-dialog v-model="visible" max-width="400">
    <v-card class="pa-4">
      <v-card-title class="text-h6 d-flex align-center">
        <v-icon color="error" icon="$error" class="mr-2"></v-icon>
        삭제 확인
      </v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" v-on:click="onCancel">취소</v-btn>
        <v-btn color="error" variant="elevated" v-on:click="onConfirm">삭제</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  message: { type: String, default: '정말로 삭제하시겠습니까?' },
})
const emit = defineEmits(['update:modelValue', 'confirm'])

const visible = computed({
  get: function () {
    return props.modelValue
  },
  set: function (val) {
    emit('update:modelValue', val)
  },
})

function onCancel() {
  visible.value = false
}
function onConfirm() {
  emit('confirm')
  visible.value = false
}
</script>
