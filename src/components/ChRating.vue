<template>
  <div class="rating">
    <div class="rating__item" v-for="i in count" :key="i"></div>
  </div>
</template>

<script>
export default {
  name: 'ChRating',
  props: {
    count: {
      type: Number,
      default: 5,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

.rating {
  @include horizontal_container(0.4);

  &__item {
    width: 2rem;
    height: 2rem;
    background-image: url('@/assets/icons/star.svg');
    background-repeat: no-repeat;
    background-size: 1.8rem;
    background-position: center;
  }
}
</style>
