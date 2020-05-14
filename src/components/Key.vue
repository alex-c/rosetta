<template>
  <div class="key" @mouseover="hovering = true" @mouseleave="hovering = false">
    {{ tKey }}
    <span class="mdi mdi-close" @click="removeKey" v-show="hovering" />
  </div>
</template>

<script>
export default {
  name: 'key',
  props: ['tKey'],
  data() {
    return {
      hovering: false,
    };
  },
  methods: {
    removeKey: function() {
      this.$confirm({ message: `Are you sure you want do remove the key '${this.tKey}'? All translations for this key will be lost.` }, () => {
        this.$store.commit('removeKey', this.tKey);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/style/colors.scss';

.key {
  height: 14px;
  padding: 4px;
  border-bottom: 1px solid $color-bg-app;
  &:last-child {
    border-bottom: none;
  }
  & > .mdi {
    float: right;
    &:hover {
      cursor: pointer;
      color: $color-state-error;
    }
  }
}
</style>
