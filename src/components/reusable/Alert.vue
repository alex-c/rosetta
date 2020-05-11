<template>
  <div :class="['alert', type + '-area']">
    <span :class="['mdi', 'mdi-' + icon, 'alert-icon']" v-if="hideIcon === undefined" />
    <span :class="['mdi', 'mdi-close', 'close-icon']" v-if="closeable !== undefined" @click="$emit('close')" />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'alert',
  props: {
    type: {
      type: String,
      required: true,
    },
    hideIcon: String,
    closeable: String,
  },
  data() {
    let icon = '';
    switch (this.type) {
      case 'error':
        icon = 'alert';
        break;
      case 'warning':
        icon = 'alert-circle';
        break;
      case 'success':
        icon = 'check';
        break;
      default:
        throw new Error(`Unknown alert type ${this.type}`);
    }
    return {
      icon,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/style/classes.scss';

.alert {
  border-radius: 3px;
  padding: 8px;
  font-size: 13px;
  box-shadow: 1px 1px 1px 0px $color-bg-app;
  & > .alert-icon {
    float: left;
    margin-right: 8px;
  }
  & > .close-icon {
    float: right;
    margin-left: 8px;
    &:hover {
      cursor: pointer;
      color: $color-bg-app;
    }
  }
}
</style>
