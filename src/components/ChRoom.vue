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
        <div class="room__name">{{ room.type }}</div>
        <div class="room__description">
          {{ description }}, площадь {{ room.area }} м2
        </div>
      </div>
      <div class="room__price">
        {{ room.price.toLocaleString() }}
        <span class="ruble">₽</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import plural from '@/plugins/plural';

export default {
  name: 'ChRoom',
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isHovered = ref(false);

    const description = computed(() => {
      const ext = props.room.ext !== 0 ? `+${props.room.ext}` : '';
      const pl = plural(
        props.room.ext !== 0 ? props.room.ext : props.room.base,
        ['кровать', 'кровати', 'кроватей']
      );

      return `${props.room.base}${ext} ${pl}`;
    });

    return {
      isHovered,
      description,
    };
  },
};
</script>
