<template>
  <div class="feature">
    <div v-for="(feature, i) in features" :key="i" class="feature__block">
      {{ feature }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheFeatures',
  setup() {
    const features = [
      'Открытый бассейн',
      'Песочно-галечный пляж',
      'Wi-Fi в отеле',
      '500 м до моря',
      '32 км до аэропорта',
    ];

    return { features };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

.feature {
  display: flex;
  gap: 1.4rem;
  flex-wrap: wrap;

  &__block {
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    font-weight: 500;
    border-radius: 4rem;
    user-select: none;
    border: 0.1rem solid #d9d9d9;
    background-color: $main80;
    width: max-content;
    height: max-content;
  }
}
</style>
