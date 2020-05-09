<template>
  <div class="select">
    <slot />
    <select>
  </div>
</template>

<script>
export default {
  name: 'select',
};
</script>

<style lang="scss" scoped>
.select select {
  display: none;
}
</style>
