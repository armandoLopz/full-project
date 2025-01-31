<template>
    <VAppBar color="#FF7043">
      <v-toolbar-title class="title">{{ title }}</v-toolbar-title>
    </VAppBar>
</template>

<style scoped>

.title {
  font-family: sans-serif;
  font-size: 2rem;
  text-align: center;
  margin: 0;
  padding: 1.25rem 0;
}
</style>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'VALENCIA SABE' 
  }
})
</script>