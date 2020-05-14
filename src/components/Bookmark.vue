<template>
  <div class="bookmark" @click="expanded = !expanded">
    <span class="mdi mdi-application-import load-project" @click.stop="attemptLoadProject" />
    {{ project.name }}
    <div class="bookmark-details" v-show="expanded">
      <div class="bookmark-path">{{ project.path }}</div>
      <span class="mdi mdi-close remove-bookmark" @click.stop="removeBookmark" />
      {{ project.format }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'bookmark',
  props: ['project'],
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    projectLoaded() {
      return this.$store.state.projectLoaded;
    },
  },
  methods: {
    attemptLoadProject: function() {
      if (this.projectLoaded) {
        this.$confirm({ message: 'Are you sure you want to open this project? Any unsaved progress on the currently loaded project will be lost.' }, () => {
          this.loadProject();
        });
      } else {
        this.loadProject();
      }
    },
    loadProject: function() {
      this.$store
        .dispatch('loadProject', { path: this.project.path, format: this.project.format, name: '' })
        .then(() => {
          if (this.$route.path !== '/project') {
            this.$router.push('/project');
          }
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    removeBookmark: function() {
      this.$store.commit('removeBookmark', this.project.name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/style/colors.scss';

.bookmark {
  margin: 8px;
  padding: 4px;
  background-color: $color-bg-content;
  border: 1px solid $color-bg-view;
  border-radius: 3px;
  box-shadow: 1px 1px 1px 0px $color-bg-app;
  &:hover {
    cursor: pointer;
  }
  .mdi {
    float: right;
  }
}

.load-project:hover {
  color: $color-primary;
}

.bookmark-details {
  font-size: 11px;
  overflow: auto;
}

.bookmark-path {
  background-color: $color-bg-app;
  padding: 2px 4px;
  margin: 4px 0px;
  border-radius: 2px;
  font-family: inconsolatamedium, monospace;
  font-size: 12px;
}

.remove-bookmark:hover {
  color: $color-state-error;
}
</style>
