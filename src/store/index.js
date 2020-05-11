import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// Require node modules
const fs = require('fs').promises;
const path = require('path');

// Load bookmarks from storage
const bookmarks = localStorage.getItem('bookmarks') || [];

// Initialize store
export default new Vuex.Store({
  state: {
    projectLoaded: false,
    projectName: '',
    projectPath: '',
    bookmarks: bookmarks,
  },
  mutations: {
    bookmarkProject(state, project) {
      state.bookmarks.push({ name: project.name, path: project.path });
      localStorage.setItem('bookmarks', state.bookmarks);
    },
    projectLoaded(state, project) {
      state.projectLoaded = true;
      state.projectName = project.name;
      state.projectPath = project.path;
    },
  },
  actions: {
    async loadProject({ commit, state }, project) {
      if (project.path === '') {
        throw new Error('No project directory path provided.');
      }
      if (project.format === '') {
        throw new Error('No i18n format provided.');
      }

      // Read files
      project.locales = {};
      try {
        const files = await fs.readdir(project.path);
        for (let i = 0; i < files.length; i++) {
          if (files[i].endsWith('.json')) {
            const filePath = path.join(project.path, files[i]);
            const fileBuffer = await fs.readFile(filePath);
            project.locales[files[i].substring(0, files[i].lastIndexOf('.'))] = { fileName: files[i], filePath, source: fileBuffer.toString('utf-8') };
          }
        }
      } catch (error) {
        console.error(error);
        throw new Error(`Failed reading directory '${project.path}'.`);
      }

      // Parse locales
      for (let locale in project.locales) {
        try {
          project.locales[locale].translations = JSON.parse(project.locales[locale].source);
          project.locales[locale].state = 'parsed';
        } catch (error) {
          project.locales[locale].translations = null;
          project.locales[locale].state = 'error';
          project.locales[locale].message = `Failed parsing file '${project.locales[locale]}'.`;
          console.error(error);
        }
      }

      // Commit project!
      if (project.name !== '') {
        commit('bookmarkProject', project);
      }
      commit('projectLoaded', project);
    },
  },
  modules: {},
});
