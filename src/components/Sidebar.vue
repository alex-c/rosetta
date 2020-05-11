<template>
  <div id="sidebar">
    <div id="sidebar-buttons">
      <SidebarButton icon="bookmark" @click="setSidebarMenu" menu="projects" :active="menu" />
      <SidebarButton icon="translate" @click="setSidebarMenu" menu="locales" :active="menu" />
      <SidebarButton icon="cog" @click="setSidebarMenu" menu="settings" :active="menu" />
    </div>
    <div id="sidebar-drawer" v-if="menu != 'none'">
      <div id="menu-projects" v-if="menu == 'projects'">
        <div class="menu-header">Projects</div>
        <div class="placeholder" v-if="bookmarks.length === 0">No projects bookmarked.</div>
        <div v-else>
          <Bookmark v-for="bookmark in bookmarks" :key="bookmark.name" :project="bookmark" />
        </div>
      </div>
      <div id="menu-locales" v-if="menu == 'locales'">
        <div class="menu-header">Locales</div>
        <div class="placeholder" v-if="!projectLoaded">No project loaded.</div>
        <div v-else>
          <Locale v-for="locale in locales" :key="locale.name" :locale="locale" />
        </div>
      </div>
      <div id="menu-settings" v-if="menu == 'settings'">
        <div class="menu-header">Settings</div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarButton from './SidebarButton.vue';
import Bookmark from './Bookmark.vue';
import Locale from './Locale.vue';

export default {
  name: 'sidebar',
  components: { SidebarButton, Bookmark, Locale },
  data() {
    return {
      menu: 'projects',
    };
  },
  computed: {
    projectLoaded: function() {
      return this.$store.state.projectLoaded;
    },
    bookmarks: function() {
      return this.$store.state.bookmarks;
    },
    locales: function() {
      return this.$store.state.locales;
    },
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
