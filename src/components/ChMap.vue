<template>
  <div class="map">
    <iframe
      src="https://www.openstreetmap.org/export/embed.html?bbox=55.17776012420655%2C25.13750011633375%2C55.192898511886604%2C25.145090369792342&amp;layer=transportmap&amp;marker=25.14129530205094%2C55.18532931804657"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'ChMap',
};
</script>

<style scoped lang="scss">
.map {
  background-color: #8e96a6;

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
