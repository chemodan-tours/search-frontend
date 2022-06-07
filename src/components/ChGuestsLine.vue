<template>
  <div class="list__item">
    <div class="list__category category">
      <div class="category__name">{{ name }}</div>
      <div class="category__description">{{ description }}</div>
    </div>
    <div class="list__counter counter">
      <button
        class="counter__btn counter__btn_prev"
        :disabled="!subAvailable"
        @click.prevent="sub"
      >
        -
      </button>
      <div class="counter__block">{{ modelValue }}</div>
      <button
        class="counter__btn counter__btn_next"
        :disabled="!addAvailable"
        @click.prevent="add"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'ChGuestsLine',
  emits: ['update:modelValue'],
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const addAvailable = computed(() => props.modelValue < props.max);
    const subAvailable = computed(() => props.modelValue > props.min);

    const add = () => emit('update:modelValue', props.modelValue + 1);
    const sub = () => emit('update:modelValue', props.modelValue - 1);

    return {
      addAvailable,
      subAvailable,
      add,
      sub,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

.list__item {
  padding: 2.4rem 0;
  margin: 0 3rem;
  @include horizontal_container(3.2);
  border-bottom: 0.1rem solid $main60;

  &:last-child {
    border-bottom: none;
  }
}

.category {
  @include vertical_container(0.8);
  font-size: 1.6rem;
  flex: 1;

  &__name {
    font-weight: 600;
  }

  &__description {
    font-size: 1.4rem;
  }
}

.counter {
  @include horizontal_container(1);
  font-size: 1.6rem;

  &__btn {
    width: 2.4rem;
    height: 2.4rem;
    font-size: 1.7rem;
    display: flex;
    justify-content: center;
    padding: 0;
    border: 0.1rem solid $main40;
    border-radius: 100%;
    text-align: center;
    font-weight: 500;
    color: $main20;
    user-select: none;

    &:hover,
    &:focus,
    &:active {
      background-color: transparent;
      border-color: black;
      color: black;
    }

    &:disabled {
      border-color: $main60;
      color: $main60;

      &:hover,
      &:focus {
        border-color: $main60;
        color: $main60;
      }
    }
  }

  &__block {
    min-width: 1.6rem;
    text-align: center;
  }
}
</style>
