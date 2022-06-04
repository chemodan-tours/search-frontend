<template>
  <section class="promo">
    <div class="title">
      <ch-rating></ch-rating>
      <div class="title__container">
        <div class="title__block">
          <h2 class="title__name">Burj Al Arab Jumeirah</h2>
          <div class="title__description">
            Jumeirah Beach Road, Madinat Jumeirah Resort, Аль-Суфух, Дубай, ОАЭ
          </div>
        </div>
        <button class="title__button">Забронировать</button>
      </div>
    </div>
    <ch-images></ch-images>
    <div class="description">
      <div class="description__text">
        <p>
          До пляжа можно дойти всего за 4 минуты. Пятизвездочный отель Jumeirah
          Al Qasr расположен на частном пляже протяженностью 2 км, на просторной
          территории с ландшафтным садом и искусственными каналами. К услугам
          гостей номера с собственными меблированным балконом и рыбный ресторан
          над водами Персидского залива.
        </p>
        <p>
          До пляжа можно дойти всего за 4 минуты. Пятизвездочный отель Jumeirah
          Al Qasr расположен на частном пляже протяженностью 2 км, на просторной
          территории с ландшафтным садом и искусственными каналами. К услугам
          гостей номера с собственными меблированным балконом и рыбный ресторан
          над водами Персидского залива.
        </p>
      </div>
      <ch-features class="description__features"></ch-features>
    </div>
  </section>
  <section>
    <h3>Выбор варианта размещения</h3>
    <div class="rooms-container">
      <ch-room v-for="(room, i) in rooms" :key="i" :room="room"></ch-room>
    </div>
  </section>
  <section>
    <h3>Где вы будете</h3>
    <ch-map class="map-block"></ch-map>
  </section>
</template>

<script>
import ChRating from '@/components/ChRating';
import ChImages from '@/components/ChImages';
import ChFeatures from '@/components/ChFeatures';
import ChMap from '@/components/ChMap';
import ChRoom from '@/components/ChRoom';

export default {
  name: 'HotelView',
  components: {
    ChRoom,
    ChFeatures,
    ChRating,
    ChImages,
    ChMap,
  },
  setup() {
    const rooms = [
      {
        type: 'Комфорт',
        area: '15-23',
        base: 2,
        ext: 1,
        price: 73450,
        images: [
          require('@/assets/images/rooms/comfort/1.jpg'),
          require('@/assets/images/rooms/comfort/2.jpg'),
        ],
      },
      {
        type: 'Стандарт',
        area: '10',
        base: 1,
        ext: 0,
        price: 53450,
        images: [
          require('@/assets/images/rooms/standart/1.jpg'),
          require('@/assets/images/rooms/standart/2.jpg'),
        ],
      },
      {
        type: 'Стандарт Плюс',
        area: '15-18',
        base: 2,
        ext: 1,
        price: 63450,
        images: [
          require('@/assets/images/rooms/standart_plus/1.jpg'),
          require('@/assets/images/rooms/standart_plus/2.jpg'),
        ],
      },
    ];

    return { rooms };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

.promo {
  @include vertical_container(6.4);
}

.title {
  @include vertical_container(1.6);

  &__block {
    @include vertical_container(0.8);
  }

  &__container {
    display: flex;
    column-gap: 2rem;
    justify-content: space-between;
    align-items: center;
  }

  &__description {
    font-size: 1.4rem;
  }

  &__button {
    border: 0.1rem solid $light-gray;
    color: $green;

    &:hover {
      background-color: transparent;
      border-color: $green;
    }

    &:focus {
      border-color: $green;
      background-color: transparent;
    }

    &:disabled {
      border-color: $main80;

      &:hover {
        border-color: $main80;
      }
    }
  }
}

.map-block {
  width: 100%;
}

.rooms-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 3.2rem;
  grid-row-gap: 4rem;
}

.map-block {
  height: calc($width / 8 * 3 + 1.6rem);
  border-radius: $border-image;
  overflow: hidden;
}

.description {
  display: grid;
  grid-template-columns: 6fr 5fr;
  grid-column-gap: $width / 12;

  &__text {
    font-size: 2rem;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    row-gap: 1.6rem;
  }

  &__features {
    height: max-content;
  }
}
</style>
