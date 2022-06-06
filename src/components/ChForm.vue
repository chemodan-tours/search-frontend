<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
import { ref, provide, computed, watch } from 'vue';

export default {
  name: 'ChForm',
  emits: ['update:active'],
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const activeField = ref(null);
    provide('activeField', activeField);

    const activeForm = computed(() => activeField.value !== null);
    provide('activeForm', activeForm);

    watch(activeForm, (value) => emit('update:active', value));
    watch(
      () => props.active,
      (value) => !value && (activeField.value = null)
    );
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

form {
  border: 0.1rem solid $main60;
  border-radius: $border-search;
  background-color: $main100;
  display: grid;
  grid-template-columns: repeat(2, 20rem) repeat(3, 15rem) 5.2rem;
  width: max-content;
  margin: 0 auto;
  transition: 0.15s;
  position: relative;
}
</style>
