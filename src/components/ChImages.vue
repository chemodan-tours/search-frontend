<template>
  <div class="image">
    <div class="image__container" v-for="(image, i) in images" :key="i">
      <img :src="image" alt="Hotel" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ChImages',
  setup() {
    const images = [
      require('@/assets/images/1.jpg'),
      require('@/assets/images/2.jpg'),
      require('@/assets/images/3.jpg'),
      require('@/assets/images/4.jpg'),
      require('@/assets/images/5.jpg'),
    ];

    return {
      images,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

$size: $width / 4;

.image {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, $size * 0.75);
  grid-gap: 1.6rem;

  &__container {
    background-color: $main60;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }

    &:first-child {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 3;
      border-radius: $border-image 0 0 $border-image;
    }
    &:nth-child(3) {
      border-top-right-radius: $border-image;
    }
    &:nth-child(5) {
      border-bottom-right-radius: $border-image;
    }
  }
}
</style>
