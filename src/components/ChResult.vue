<template>
  <div
    class="room"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="room__image">
      <Transition name="fade">
        <img v-if="!isHovered" :src="room.images[0]" alt="Room" />
        <img v-else :src="room.images[1]" alt="Room" />
      </Transition>
    </div>
    <div class="room__information">
      <div class="room__block">
        <div class="room__name">{{ room.name }}</div>
        <div class="room__description">описание</div>
      </div>
      <div class="room__price">
        {{ room.price.toLocaleString() }}
        <span class="ruble">₽</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
// import plural from '@/plugins/plural';

export default {
  name: 'ChResult',
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const isHovered = ref(false);

    return {
      isHovered,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

.room__image {
  height: $width / 8 * 3;
}
</style>
