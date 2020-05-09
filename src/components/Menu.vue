<template>
  <div id="menu">
    <div id="menu-buttons">
      <MenuButton icon="bookmark" @click="setMenu('projects')" />
      <MenuButton icon="translate" @click="setMenu('translations')" />
    </div>
    <div id="menu-drawer" v-if="menu != 'none'">
      <div id="menu-projects" v-if="menu == 'projects'">
        <div class="menu-header">Projects</div>
      </div>
      <div id="menu-translations" v-if="menu == 'translations'">
        <div class="menu-header">Translations</div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuButton from './MenuButton.vue';

export default {
  name: 'menu',
  components: { MenuButton },
  data() {
    return {
      menu: 'none',
    };
  },
  methods: {
    setMenu: function(menu) {
      if (menu === this.menu) {
        this.menu = 'none';
        this.$emit('collapsed', true);
      } else {
        this.menu = menu;
        this.$emit('collapsed', false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../style/colors.scss';

#menu {
  float: left;
  height: 100%;
  background-color: $color-bg-app;
  border-right: 1px solid $color-dark-border;
}

#menu-buttons {
  float: left;
  width: 40px;
  height: 100%;
}

#menu-drawer {
  float: left;
  width: 200px;
  height: 100%;
  text-align: left;
  background-color: $color-bg-view;
}

.menu-header {
  padding: 8px;
  background-color: $color-bg-app;
}
</style>
