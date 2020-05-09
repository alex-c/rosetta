<template>
  <div class="timeline-wizard">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'timeline-wizard',
};
</script>

<style lang="scss" scoped>
.timeline-wizard {
  padding: 16px 8px;
}
</style>
