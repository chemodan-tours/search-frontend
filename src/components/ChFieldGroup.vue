<template>
  <slot></slot>
</template>

<script>
import { provide, inject, computed } from 'vue';

export default {
  name: 'ChFieldGroup',
  setup() {
    const group = [];
    const activeField = inject('activeField');

    const activeFieldGroup = computed(() => group.includes(activeField.value));

    provide('fieldGroup', group);
    provide('activeFieldGroup', activeFieldGroup);
  },
};
</script>
