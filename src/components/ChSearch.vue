<template>
  <Teleport to="#header__container">
    <div class="search">
      <header class="search__container">
        <div class="search__block">
          <div class="logo"></div>
          <ch-form class="search__form" v-model:active="overlayVisible">
            <ch-field
              title="Откуда"
              placeholder="Откуда едем?"
              v-model="search.origin"
            >
              <ch-select :items="originPrompt" @select="setOrigin"></ch-select>
            </ch-field>
            <ch-field
              title="Куда"
              placeholder="Куда едем?"
              v-model="search.destination"
            >
              <ch-select
                :items="destinationPrompt"
                @select="setDestination"
              ></ch-select>
            </ch-field>
            <ch-field-group>
              <ch-field
                title="Приезд"
                placeholder="Когда?"
                readonly
                v-model="search.from_date"
              ></ch-field>
              <ch-field
                title="Выезд"
                placeholder="Когда?"
                readonly
                v-model="search.to_date"
              ></ch-field>
              <ch-calendar></ch-calendar>
            </ch-field-group>
            <ch-field
              title="Кто"
              placeholder="Кто едет?"
              readonly
              v-model="touristsText"
            >
              <ch-guests class="field_guest" @updated="setTourists"></ch-guests>
            </ch-field>
            <div class="button-container">
              <button class="search__btn"></button>
            </div>
          </ch-form>
        </div>
      </header>
      <!--    <div class="search__filter"></div>-->
      <Transition name="fade">
        <div v-if="overlayVisible" class="overlay" @click="closeOverlay"></div>
      </Transition>
    </div>
  </Teleport>
</template>

<script>
import { ref, reactive, watch, computed, onMounted } from 'vue';
import { places_prompt, places_nearest } from '@/plugins/places';
import plural from '@/plugins/plural';
import { debounce } from 'throttle-debounce';

import ChField from '@/components/ChField';
import ChForm from '@/components/ChForm';
import ChSelect from '@/components/ChSelect';
import ChGuests from '@/components/ChGuests';
import ChCalendar from '@/components/ChCalendar';
import ChFieldGroup from '@/components/ChFieldGroup';

export default {
  name: 'ChSearch',
  components: {
    ChFieldGroup,
    ChCalendar,
    ChGuests,
    ChSelect,
    ChForm,
    ChField,
  },
  setup() {
    const overlayVisible = ref(false);

    const search = reactive({
      origin: '',
      destination: '',
      from_date: null,
      to_date: null,
      tourists: {
        adults: 1,
        children: 0,
        babies: 0,
      },
    });

    const originPrompt = ref([]);
    const loadOrigin = async () =>
      search.origin
        ? (originPrompt.value = await places_prompt(search.origin))
        : (originPrompt.value = []);
    watch(() => search.origin, debounce(150, loadOrigin));

    const destinationPrompt = ref([]);
    const loadDestination = async () =>
      search.destination
        ? (destinationPrompt.value = await places_prompt(search.destination))
        : (destinationPrompt.value = []);
    watch(() => search.destination, debounce(150, loadDestination));

    const touristsText = computed(() => {
      const total =
        search.tourists.adults +
        search.tourists.children +
        search.tourists.babies;
      const word = plural(total, ['гость', 'гостя', 'гостей']);

      return `${total} ${word}`;
    });

    const setOrigin = (value) => (search.origin = value);
    const setDestination = (value) => (search.destination = value);
    const setTourists = (value) => (search.tourists = value);

    const closeOverlay = () => (overlayVisible.value = false);

    onMounted(async () => {
      const nearest = await places_nearest();
      search.origin = nearest ?? '';
    });

    return {
      overlayVisible,
      search,
      originPrompt,
      destinationPrompt,
      touristsText,
      setOrigin,
      setDestination,
      setTourists,
      closeOverlay,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

.search {
  position: relative;
  width: 100%;
  z-index: 2;

  &__container {
    position: relative;
    background-color: white;
    border-bottom: 0.1rem solid $main60;
    z-index: 10;
  }

  &__block {
    position: relative;
    width: $width;
    margin: 0 auto;
    padding: 1.6rem 0;
  }
}

.field_guest {
  right: 0;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.25);
}

.search__btn {
  width: 3.6rem;
  height: 3.6rem;
  margin: 0 0.4rem;
  background-color: rgb(246, 183, 84);
  border-radius: 100%;
  padding: 0;
  background-image: url('@/assets/icons/search.svg');
  background-repeat: no-repeat;
  background-size: 1.8rem;
  background-position: center;

  &:focus {
    border: 0.1rem solid #9b6d24;
  }

  &:disabled {
    background-color: $main40;
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.logo {
  position: absolute;
  background-image: url('@/assets/icons/logo/logo.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 3.2rem;
  height: 100%;
  top: 0;
  left: 0;
}

.button-container {
  display: flex;
  align-items: center;
  z-index: 1;
}
</style>
