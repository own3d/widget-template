<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useExtensionStore} from '../stores/extension.ts'

const extensionStore = useExtensionStore()
const {user, context} = storeToRefs(extensionStore)
</script>

<template>
  <div>
    User: {{ user }}
    Context: {{ context }}
  </div>
</template>
