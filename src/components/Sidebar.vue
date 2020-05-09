<template>
  <div id="sidebar">
    <div id="sidebar-buttons">
      <SidebarButton icon="bookmark" @click="setSidebarMenu('projects')" />
      <SidebarButton icon="translate" @click="setSidebarMenu('translations')" />
      <SidebarButton icon="cog" @click="setSidebarMenu('settings')" />
    </div>
    <div id="sidebar-drawer" v-if="menu != 'none'">
      <div id="menu-projects" v-if="menu == 'projects'">
        <div class="menu-header">Projects</div>
        <div class="placeholder">No projects bookmarked.</div>
      </div>
      <div id="menu-translations" v-if="menu == 'translations'">
        <div class="menu-header">Locales</div>
        <div class="placeholder">No project loaded.</div>
      </div>
      <div id="menu-translations" v-if="menu == 'settings'">
        <div class="menu-header">Settings</div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarButton from './SidebarButton.vue';

export default {
  name: 'sidebar',
  components: { SidebarButton },
  data() {
    return {
      menu: 'projects',
    };
  },
  methods: {
    setSidebarMenu: function(menu) {
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

#sidebar {
  position: fixed;
  top: 32px;
  left: 0px;
  bottom: 0px;
  background-color: $color-bg-app;
  border-right: 1px solid $color-dark-border;
}

#sidebar-buttons {
  float: left;
  width: 40px;
  height: 100%;
}

#sidebar-drawer {
  float: left;
  width: 300px;
  height: 100%;
  text-align: left;
  background-color: $color-bg-view;
}

.menu-header {
  padding: 8px;
  background-color: $color-bg-app;
  border-bottom: 1px solid $color-primary;
}

.placeholder {
  padding: 16px;
}
</style>
