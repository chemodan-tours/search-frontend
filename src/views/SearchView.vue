<template>
  <ch-search></ch-search>
  <!-- <section class="results-container">
    <router-link to="/hotel" v-for="(tour, i) in tours" :key="i">
      <ch-result :room="tour"></ch-result>
      <ch-skeleton></ch-skeleton>
    </router-link>
  </section> -->
  <div class="message">
    <!-- <h2 class="message__name">Ничего не найдено 😞</h2> -->
    <h2 class="message__name">Ничего не найдено 😿</h2>
    <div class="message__description">
      Попробуйте скорректировать или удалить некоторые фильтры либо изменить
      регион поиска.
    </div>
  </div>
</template>

<script>
// import ChResult from '@/components/ChResult';
import ChSearch from '@/components/ChSearch';
// import ChSkeleton from '@/components/ChSkeleton';

export default {
  name: 'SearchView',
  components: {
    ChSearch,
    // ChResult,
    // ChSkeleton,
  },
  setup() {
    const tours = [
      {
        name: 'Five Jumeirah Village',
        stars: 5,
        price: 173450,
        images: [
          require('@/assets/images/tours/village/1.jpg'),
          require('@/assets/images/tours/village/2.jpg'),
        ],
      },
      {
        name: 'Address Dubai Mall',
        stars: 5,
        price: 153450,
        images: [
          require('@/assets/images/tours/mall/1.jpg'),
          require('@/assets/images/tours/mall/2.jpg'),
        ],
      },
      {
        name: 'PRESIDENTIAL LUXURY CONDO-5 STARS HOTEL EXPERIENCE- DAMAC DISTINCTION',
        stars: 4,
        price: 63450,
        images: [
          require('@/assets/images/tours/presidential/1.jpg'),
          require('@/assets/images/tours/presidential/2.jpg'),
        ],
      },
      {
        name: 'Golden Sands Hotel Creek',
        stars: 5,
        price: 250656,
        images: [
          require('@/assets/images/tours/golden_sends/1.jpg'),
          require('@/assets/images/tours/golden_sends/2.jpg'),
        ],
      },
      {
        name: 'Jumeirah Al Qasr',
        stars: 5,
        price: 350656,
        images: [
          require('@/assets/images/tours/jumeirah/1.jpg'),
          require('@/assets/images/tours/jumeirah/2.jpg'),
        ],
      },
      {
        name: 'Burj Al Arab Jumeirah',
        stars: 5,
        price: 450656,
        images: [
          require('@/assets/images/tours/burj/1.jpg'),
          require('@/assets/images/tours/burj/2.jpg'),
        ],
      },
    ];

    return { tours };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

.results-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 3.2rem;
  grid-row-gap: 5.2rem;
  margin-top: 8rem;
}

.message {
  @include vertical_container(2);
  margin: 24rem auto;
  width: 60rem;
  text-align: center;

  &__description {
    font-size: 2rem;
    line-height: 1.5;
  }
}
</style>
