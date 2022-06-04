<template>
  <main-layout>
    <router-view />
  </main-layout>
</template>

<script>
import MainLayout from '@/layout/MainLayout';

export default {
  components: {
    MainLayout,
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/global';
</style>
