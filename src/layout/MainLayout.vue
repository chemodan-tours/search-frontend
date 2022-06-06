<template>
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
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}
</style>
