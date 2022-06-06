<template>
  <div class="calendar">
    <div class="calendar__body">
      <div class="calendar__switch">
        <button class="calendar__switch-btn" @click.prevent="last">
          &lt;--
        </button>
        <button class="calendar__switch-btn" @click.prevent="next">
          --&gt;
        </button>
      </div>
      <ch-calendar-block :date="leftCalendar"></ch-calendar-block>
      <ch-calendar-block :date="rightCalendar"></ch-calendar-block>
    </div>
  </div>
</template>

<script>
import { ref, computed, provide } from 'vue';
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
  }
}
</style>
