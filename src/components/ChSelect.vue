<template>
  <Transition name="fade">
    <div v-if="visibility" class="list">
      <div
        class="list__item"
        v-for="(item, i) in items"
        :key="i"
        tabindex="0"
        @click="emitSelect(item.name)"
        @keydown.enter="emitSelect(item.name)"
      >
        <div class="place">{{ item.name }}, {{ item.country_name }}</div>
        <div class="code">{{ item.code }}</div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { computed, inject } from 'vue';

export default {
  name: 'ChSelect',
  emits: ['select'],
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const activeForm = inject('activeForm');
    const activeParentField = inject('activeParentField');

    let alreadySelected = false;

    const visibility = computed(() => {
      return (
        props.items.length !== 0 &&
        activeForm.value &&
        activeParentField.value &&
        !alreadySelected
      );
    });

    const emitSelect = (item) =>
      (alreadySelected = true) && emit('select', item);

    return {
      visibility,
      emitSelect,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

.list__item {
  @include horizontal_container(3.2);
  font-size: 1.6rem;
  padding: $padding-search;
  min-width: max-content;
  transition: background-color 0.15s;
  cursor: pointer;
  user-select: none;

  &:hover,
  &:focus {
    background-color: $main80;
  }

  .place {
    flex: 1;
  }

  .code {
    font-size: 1.2rem;
    font-weight: 600;
    color: $main40;
  }
}
</style>
