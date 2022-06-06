<template>
  <div class="calendar-block">
    <div class="calendar-block__header">
      <div class="calendar-block__month">{{ headerLabel }}</div>
      <ul class="calendar-block__weekdays">
        <li class="weekday" v-for="(week, i) in weekLabels" :key="i">
          {{ week }}
        </li>
      </ul>
    </div>
    <div class="calendar-block__body">
      <div
        v-for="(date, i) in calendar"
        :key="i"
        class="calendar-block__date"
        :class="{
          'calendar-block__date_range': inRange(date) || inHoverRange(date),
        }"
        @mouseenter="hover(date)"
        @mouseleave="unHover"
      >
        <div
          v-if="date !== null"
          class="calendar-block__cell"
          :class="{
            'calendar-block__cell_disabled': !isAvailableDate(date),
            'calendar-block__cell_active': isStart(date) || isEnd(date),
          }"
          @click="select(date)"
        >
          {{ date.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject } from 'vue';
import { today } from '@/plugins/dates';
import {
  eachDayOfInterval,
  endOfMonth,
  getDay,
  startOfMonth,
  compareAsc,
  isEqual,
  addYears,
  format,
} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

export default {
  name: 'ChCalendarBlock',
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  setup(props) {
    const DAYS = 7;
    const LEFT_BOUND = today;
    const RIGHT_BOUND = addYears(today, 2);

    // Helpers
    const convertDay = (day) => (day !== 0 ? day : 7);
    const inInteraval = (start, end, target) =>
      compareAsc(end, target) > -1 && compareAsc(target, start) > -1;

    // Labels
    const headerLabel = computed(() => {
      const month = format(props.date, 'LLLL', { locale: ruLocale });
      const year = props.date.getFullYear();

      return `${month} ${year}`;
    });

    const weekLabels = Array(DAYS)
      .fill(0)
      .map((_, i) => ruLocale.localize.day((i + 1) % 7, { width: 'short' }));

    // Generate calendar
    const getOffset = (date) => {
      const start = startOfMonth(date);
      return convertDay(getDay(start)) - 1;
    };

    const generateCalendar = (date) => {
      const offsetArray = Array(getOffset(date)).fill(null);
      const calendar = eachDayOfInterval({
        start: startOfMonth(date),
        end: endOfMonth(date),
      });

      return [...offsetArray, ...calendar];
    };

    // Check out of range
    const isAvailableDate = (date) =>
      inInteraval(LEFT_BOUND, RIGHT_BOUND, date);

    const calendar = computed(() => generateCalendar(props.date));

    // Date hover
    const hoveredItem = inject('hoveredItem');

    const hover = (date) => (hoveredItem.value = date);
    const unHover = () => (hoveredItem.value = null);

    // Select range
    const { start, end } = inject('selectedRange');

    const select = (date) => {
      if (!isAvailableDate(date)) return;

      if (compareAsc(date, start.value) === 1) {
        end.value = date;
      } else {
        start.value = date;
        end.value = null;
      }
    };

    // Check bounds
    const isStart = (date) => isEqual(date, start.value);
    const isEnd = (date) => isEqual(date, end.value);

    // Check selected items between bounds
    const inRange = (date) => {
      if (!start.value || !end.value) return false;
      return inInteraval(start.value, end.value, date);
    };

    // Check hovered items between bounds
    const inHoverRange = (date) => {
      if (!start.value || !isAvailableDate(date)) return false;
      return inInteraval(start.value, hoveredItem.value, date);
    };

    return {
      headerLabel,
      weekLabels,
      isAvailableDate,
      calendar,
      hoveredItem,
      hover,
      unHover,
      select,
      isStart,
      isEnd,
      inRange,
      inHoverRange,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

.calendar-block {
  @include vertical_container(2);

  &__body {
    display: grid;
    grid-template-columns: repeat(7, $cell_size);
    grid-auto-rows: $cell_size;
    grid-row-gap: 0.2rem;
  }

  &__date {
    display: flex;
    font-size: 1.4rem;

    &_range {
      background-color: $main60;
    }
  }

  &__cell {
    margin: auto;
  }

  &__month {
    font-weight: 600;
    font-size: 1.6rem;
    user-select: none;
    cursor: pointer;
    flex: 1;
    margin-bottom: 1.6rem;
    text-align: center;
  }

  &__weekdays {
    @include horizontal_container(0);
  }

  &__cell {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    transition: background-color 0.1s;
    font-weight: 500;
    user-select: none;
    cursor: pointer;

    &:hover {
      border: 0.1rem solid $main20;
    }

    &_active {
      background-color: black;
      color: white;

      &:hover {
        border: none;
      }
    }

    &_disabled {
      cursor: default;
      color: $main40;

      &:hover {
        border: none;
      }
    }
  }
}

.weekday {
  color: $main20;
  list-style-type: none;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  width: $cell_size;
  letter-spacing: 0.05em;
  user-select: none;
}
</style>
