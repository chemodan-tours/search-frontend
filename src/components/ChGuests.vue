<template>
  <div v-if="visibility" class="list">
    <ch-guests-line
      name="Взрослые"
      description="От 18 лет"
      :min="1"
      :max="10"
      v-model="tourists.adults"
    ></ch-guests-line>
    <ch-guests-line
      name="Дети"
      description="2–18 лет"
      :min="0"
      :max="7 - tourists.babies"
      v-model="tourists.children"
    ></ch-guests-line>
    <ch-guests-line
      name="Младенцы"
      description="Младше 2 лет"
      :min="0"
      :max="7 - tourists.children"
      v-model="tourists.babies"
    ></ch-guests-line>
  </div>
</template>

<script>
import { computed, inject, reactive, watch } from 'vue';
import ChGuestsLine from '@/components/ChGuestsLine';

export default {
  name: 'ChGuests',
  components: { ChGuestsLine },
  setup(_, { emit }) {
    const activeForm = inject('activeForm');
    const activeParentField = inject('activeParentField');

    const tourists = reactive({
      adults: 1,
      children: 0,
      babies: 0,
    });

    const visibility = computed(() => {
      return activeForm.value && activeParentField.value;
    });

    const emitUpdated = () => emit('updated', tourists);

    watch(tourists, emitUpdated);

    return {
      tourists,
      visibility,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';
</style>
