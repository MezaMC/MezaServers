<template>
  <div>
    <h1>Keep-Alive Test Component</h1>
    <p>Current Timestamp: {{ timestamp }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated } from 'vue';

const timestamp = ref<string>('');

// Log when the component is mounted
onMounted(() => {
  console.log('Component mounted');
  timestamp.value = new Date().toISOString();
});

// Log when the component is reactivated
onActivated(() => {
  console.log('Component reactivated');
  timestamp.value = new Date().toISOString();
});
</script>
