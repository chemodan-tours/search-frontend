<template>
  <div
    class="room room_loading"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="room__image"></div>
    <div class="room__information">
      <div class="room__block">
        <div class="room__name"></div>
        <div class="room__description"></div>
      </div>
      <div class="room__price"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

.room__image {
  height: $width / 8 * 3;
}

.room_loading {
  cursor: default;

  .room {
    &__image,
    &__name,
    &__description,
    &__price {
      animation: loadImage 1s linear infinite;
      background-image: linear-gradient(
        100deg,
        rgba(234 236 242 / 0.17) 10%,
        rgb(255 255 255 / 59%) 40%,
        rgba(234 236 242 / 0.17) 60%
      );
      background-size: 200% 100%;
      background-color: #eaecf2;
    }

    &__name,
    &__description {
      height: 2.8rem;
      border-radius: 2rem;
    }

    &__price {
      width: 24%;
      height: 3.6rem;
      border-radius: 2rem;
    }

    &__information {
      column-gap: 4rem;
    }
  }
}

@keyframes loadImage {
  to {
    background-position-x: -200%;
  }
}
</style>
