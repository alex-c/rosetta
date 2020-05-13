<template>
  <div :class="['locale', locale.state + '-area']" @click="expanded = !expanded">
    <span v-if="locale.state !== 'error'">
      <span class="mdi mdi-pencil-off-outline edit-control" @click.stop="hideLocale" v-if="locale.editing" />
      <span class="mdi mdi-pencil edit-control" @click.stop="editLocale" v-else />
    </span>
    <span class="mdi mdi-alert" v-else />
    {{ locale.name }}
    <div class="locale-details" v-show="expanded">
      <div class="locale-message" v-if="locale.state === 'error'">{{ locale.message }}</div>
      <div class="locale-message" v-else>{{ locale.translationCount }} / {{ keyCount }} translations</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'locale',
  props: ['locale'],
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    keyCount: function() {
      return this.$store.state.keys.length;
    },
  },
  methods: {
    editLocale: function() {
      this.$store.commit('editLocale', this.locale);
    },
    hideLocale: function() {
      this.$store.commit('hideLocale', this.locale);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/style/classes.scss';

.locale {
  margin: 8px;
  padding: 4px;
  border: 1px solid $color-bg-view;
  border-radius: 3px;
  box-shadow: 1px 1px 1px 0px $color-bg-app;
  &.none-area {
    background-color: $color-bg-content;
  }
  &:hover {
    cursor: pointer;
  }
  .mdi {
    float: right;
  }
}

.edit-control:hover {
  color: $color-primary;
}

.locale-details {
  font-size: 11px;
  overflow: auto;
}

.locale-message {
  background-color: $color-bg-app;
  padding: 2px 4px;
  margin-top: 4px;
  border-radius: 2px;
  font-family: inconsolatamedium, monospace;
  font-size: 12px;
}
</style>
