<template>
  <div id="sidebar">
    <div id="sidebar-buttons">
      <SidebarButton icon="bookmark" @click="setSidebarMenu" menu="bookmarks" :active="menu" />
      <SidebarButton icon="folder-edit" @click="setSidebarMenu" menu="project" :active="menu" />
      <SidebarButton icon="translate" @click="setSidebarMenu" menu="locales" :active="menu" />
      <SidebarButton icon="cog" @click="setSidebarMenu" menu="settings" :active="menu" />
    </div>
    <div id="sidebar-drawer" v-if="menu != 'none'">
      <div id="menu-bookmarks" v-if="menu == 'bookmarks'">
        <div class="menu-header">Project Bookmarks</div>
        <div class="placeholder" v-if="bookmarks.length === 0">No projects bookmarked.</div>
        <div v-else>
          <Bookmark v-for="bookmark in bookmarks" :key="bookmark.name" :project="bookmark" />
        </div>
      </div>
      <div id="menu-project" v-if="menu == 'project'">
        <div class="menu-header">Current Project</div>
        <div class="placeholder" v-if="!projectLoaded">No project loaded.</div>
        <div v-else>
          <div class="menu-container">
            <span v-if="project.name !== ''">
              Name: {{ project.name }}
              <br />
            </span>
            <span>Format: {{ project.format }}</span>
            <br />
            <span>Locales: {{ localeCount }}</span>
            <br />
            <span>Path:</span>
            <div id="project-path">{{ project.path }}</div>
          </div>
          <div class="menu-container">
            <InputGroup>
              <Button class="menu-button" type="success" icon="content-save" @click="saveProject">Save</Button>
              <Button class="menu-button" type="error" icon="close" @click="closeProject">Close</Button>
            </InputGroup>
          </div>
        </div>
      </div>
      <div id="menu-locales" v-if="menu == 'locales'">
        <div class="menu-header">Locales</div>
        <div class="placeholder" v-if="!projectLoaded">No project loaded.</div>
        <div v-else>
          <Locale v-for="locale in locales" :key="locale.name" :locale="locale" />
          <div class="menu-container">
            <InputGroup>
              <Button icon="plus" class="menu-button" @click="addLocale">New Locale</Button>
            </InputGroup>
          </div>
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
  computed: {
    menu: function() {
      return this.$store.state.menu;
    },
    projectLoaded: function() {
      return this.$store.state.projectLoaded;
    },
    project: function() {
      return this.$store.state.project;
    },
    bookmarks: function() {
      return this.$store.state.bookmarks;
    },
    locales: function() {
      return this.$store.state.locales;
    },
    localeCount: function() {
      let localeCount = 0;
      for (const locale in this.locales) {
        if (this.locales[locale].state !== 'error') {
          localeCount++;
        }
      }
      return localeCount;
    },
  },
  methods: {
    setSidebarMenu: function(menu) {
      if (menu === this.menu) {
        this.$store.commit('setMenu', 'none');
      } else {
        this.$store.commit('setMenu', menu);
      }
    },
    saveProject: function() {
      // TODO - save project
      console.warn("TODO: implement 'save project'.");
      this.$modal({ title: 'test' }, `<Button>lol</Button>`);
    },
    closeProject: function() {
      this.$router.push({ path: 'home' });
      this.$store.commit('setMenu', 'bookmarks');
      this.$store.commit('closeProject');
    },
    addLocale: function() {
      this.$prompt({ title: 'New Locale', message: 'Please enter a new locale name:' }, localeName => {
        if (localeName !== '') {
          this.$store.commit('addLocale', localeName);
        }
      });
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

.menu-container {
  margin: 8px;
}

.menu-button {
  flex-grow: 1;
}

#project-path {
  background-color: $color-bg-app;
  padding: 2px 4px;
  margin: 4px 0px;
  border-radius: 2px;
  font-family: inconsolatamedium, monospace;
  font-size: 12px;
}
</style>
