<script setup lang="ts">
import {inject, ref} from 'vue'
import {useAuth} from '@own3d/sdk/auth'

const extension = inject('extension')
const {onAuthorized} = useAuth(extension)
const auth = ref()

onAuthorized((user) => {
  auth.value = user
})
</script>

<template>
  {{ auth }}
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
