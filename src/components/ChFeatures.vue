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
  gap: 2rem;
  flex-wrap: wrap;

  &__block {
    font-size: 1.8rem;
    padding: 1.4rem 1.8rem;
    border-radius: 4rem;
    user-select: none;
    background-color: $main80;
    width: max-content;
    height: max-content;
  }
}
</style>
