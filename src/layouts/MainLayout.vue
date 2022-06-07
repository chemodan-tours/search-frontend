<template>
  <div id="header__container"></div>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
};
</script>

<style scoped lang="scss">
#header__container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  width: 100%;
}
</style>
