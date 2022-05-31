<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/icons/logo.svg"
      width="250"
      height="250"
    />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
};
</script>

<style lang="scss">
.home {
  text-align: center;
  font-family: 'Gilroy';
}
</style>
