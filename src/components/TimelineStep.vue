<template>
  <div class="timeline-step">
    <div class="timeline-step-circle">
      <span v-if="icon !== undefined" :class="['mdi', 'mdi-' + icon]" />
    </div>
    <div class="timeline-step-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeline-step',
  props: {
    icon: String,
  },
};
</script>

<style lang="scss" scoped>
@import '@/style/colors.scss';

.timeline-step {
  position: relative;
  border-left: 2px solid $color-primary;
  padding: 8px;
  margin-left: 16px;
  padding-left: 16px;
  min-height: 32px;
}

.timeline-step-circle {
  position: absolute;
  left: -17px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: $color-bg-app;
  border: 1px solid $color-primary;
  & > .mdi::before {
    margin: 8px;
  }
}

.timeline-step-content {
  padding-left: 8px;
}
</style>
