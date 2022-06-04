<template>
  <div class="search">
    <header class="search__container">
      <div class="search__block">
        <div class="logo"></div>
        <form class="search__form">
          <div class="city search__item">
            <label class="input" for="origin">
              <div class="input__title">Откуда</div>
              <input
                id="origin"
                class="input__block"
                placeholder="Откуда едем?"
                v-model.trim="search.origin"
              />
            </label>
          </div>
          <div class="city search__item">
            <label class="input" for="destination">
              <div class="input__title">Куда</div>
              <input
                id="destination"
                class="input__block"
                placeholder="Куда едем?"
                v-model.trim="search.destination"
              />
            </label>
          </div>
          <div class="date search__item input">
            <div class="input__title">Прибытие</div>
            <div class="input__value input__value_disabled">Когда?</div>
          </div>
          <div class="date search__item input">
            <div class="input__title">Выезд</div>
            <div class="input__value input__value_disabled">Когда?</div>
          </div>
          <div class="tourists search__item"></div>
          <div class="button-container"></div>
        </form>
      </div>
    </header>
    <!--    <div class="search__filter"></div>-->
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'ChSearch',
  setup() {
    const search = reactive({
      origin: '',
      destination: '',
      from_date: null,
      to_date: null,
    });

    return { search };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

.search {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;

  &__container {
    background-color: white;
    border-bottom: 0.1rem solid $main60;
  }

  &__block {
    width: $width;
    margin: 0 auto;
    padding: 1.6rem 0;
  }

  &__form {
    border: 0.1rem solid $main60;
    border-radius: 10rem;
    display: grid;
    grid-template-columns: repeat(5, 20rem);
    width: max-content;
    margin: 0 auto;
  }

  &__item {
    padding: 1.6rem 3rem;
    border-radius: 10rem;
  }
}

.input {
  @include vertical_container(0.4);

  &__title {
    font-size: 1.2rem;
    font-weight: 600;
  }

  &__value {
    padding: 0;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2rem;
    flex: 1;

    &_disabled {
      color: $main40;
      user-select: none;
    }
  }
}

.logo {
  position: absolute;
}
</style>
