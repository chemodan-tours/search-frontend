<template>
  <Transition name="fade">
    <div v-if="visibility" class="calendar">
      <div class="calendar__body">
        <button class="calendar__switch-btn" @click.prevent="last"></button>
        <button
          class="calendar__switch-btn next"
          @click.prevent="next"
        ></button>
        <ch-calendar-block :date="leftCalendar"></ch-calendar-block>
        <ch-calendar-block :date="rightCalendar"></ch-calendar-block>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, computed, provide, inject } from 'vue';
import { today } from '@/plugins/dates';
import { startOfMonth, addMonths, subMonths } from 'date-fns';

import ChCalendarBlock from '@/components/ChCalendarBlock';

export default {
  name: 'ChCalendar',
  components: { ChCalendarBlock },
  props: {
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
  },
  setup(props) {
    // Visibility
    const visibility = inject('activeFieldGroup');

    // Calendar
    const currentDate = ref(startOfMonth(props.startDate ?? today));

    const leftCalendar = computed(() => currentDate.value);
    const rightCalendar = computed(() => addMonths(currentDate.value, 1));

    const next = () => {
      currentDate.value = addMonths(currentDate.value, 1);
    };
    const last = () => {
      currentDate.value = subMonths(currentDate.value, 1);
    };

    provide('selectedRange', {
      start: ref(null),
      end: ref(null),
    });

    provide('hoveredItem', ref(null));

    return {
      visibility,
      currentDate,
      leftCalendar,
      rightCalendar,
      next,
      last,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

.calendar {
  transform: translate(-50%, 0);
  left: 50%;
  padding: 3rem;

  &__body {
    display: flex;
    justify-content: flex-start;
    column-gap: 2.4rem;
    position: relative;
  }

  &__switch-btn {
    position: absolute;
    top: -0.6rem;
    width: 3.2rem;
    height: 3.2rem;
    padding: 0;
    border-radius: 100%;
    background-image: url('@/assets/icons/prev.svg');
    background-repeat: no-repeat;
    background-size: 1.2rem;
    background-position: center;

    &.next {
      right: 0;
      background-image: url('@/assets/icons/next.svg');
    }
  }
}
</style>
