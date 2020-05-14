import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// Require node modules
const fs = require('fs').promises;
const path = require('path');

// JSON utils
import JsonUtils from './JsonUtils.js';

// Load bookmarks from storage
const temp = localStorage.getItem('bookmarks');
const bookmarks = temp === null ? [] : JSON.parse(temp);

// Initialize store
export default new Vuex.Store({
  state: {
    menu: 'bookmarks',
    bookmarks: bookmarks,
    projectLoaded: false,
    project: null,
    locales: null,
    keys: null,
  },
  getters: {
    validLocales: state => {
      const locales = {};
      for (let locale in state.locales) {
        if (state.locales[locale].state !== 'error') {
          locales[locale] = state.locales[locale];
        }
      }
      return locales;
    },
    editedLocales: state => {
      const locales = {};
      for (let locale in state.locales) {
        if (state.locales[locale].editing) {
          locales[locale] = state.locales[locale];
        }
      }
      return locales;
    },
    filteredKeys: state => filter => {
      return state.keys.filter(k => k.startsWith(filter));
    },
  },
  mutations: {
    setMenu(state, menu) {
      state.menu = menu;
    },
    bookmarkProject(state, project) {
      state.bookmarks.push({ name: project.name, path: project.path, format: project.format });
      localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
    },
    removeBookmark(state, projectName) {
      state.bookmarks.splice(
        state.bookmarks.findIndex(b => b.name == projectName),
        1,
      );
      localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
    },
    loadProject(state, data) {
      state.projectLoaded = true;
      state.project = data.project;
      state.locales = data.locales;
      state.keys = data.keys;
    },
    closeProject(state) {
      state.projectLoaded = false;
      state.keys = [];
      state.locales = null;
      state.project = null;
    },
    editLocale(state, locale) {
      if (state.locales[locale.name] !== undefined) {
        state.locales[locale.name].editing = true;
      }
    },
    hideLocale(state, locale) {
      if (state.locales[locale.name] !== undefined) {
        state.locales[locale.name].editing = false;
      }
    },
    addLocale(state, localeName) {
      if (state.locales[localeName] === undefined) {
        const locale = {};
        locale.name = localeName;
        locale.translations = {};
        for (let key of state.keys) {
          locale.translations[key] = '';
        }
        locale.translationCount = 0;
        locale.state = 'warning';
        locale.editing = false;
        state.locales = {
          ...state.locales,
          [localeName]: locale,
        };
      }
    },
    addKey(state, key) {
      if (!state.keys.includes(key)) {
        for (let locale in state.locales) {
          if (state.locales[locale].state !== 'error') {
            state.locales[locale].translations[key] = '';
          }
        }
        state.keys.push(key);
      }
    },
    removeKey(state, key) {
      const keyIndex = state.keys.indexOf(key);
      if (keyIndex !== -1) {
        state.keys.splice(state.keys.indexOf(key), 1);
        for (let locale in state.locales) {
          if (state.locales[locale].state !== 'error') {
            delete state.locales[locale].translations[key];
          }
        }
      }
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
      if (project.name !== '' && state.bookmarks.findIndex(b => b.name === project.name) !== -1) {
        throw new Error('That bookmark name is already taken.');
      }

      // Read files
      const locales = {};
      try {
        const files = await fs.readdir(project.path);
        for (let i = 0; i < files.length; i++) {
          if (files[i].endsWith('.json')) {
            const filePath = path.join(project.path, files[i]);
            const fileBuffer = await fs.readFile(filePath);
            const name = files[i].substring(0, files[i].lastIndexOf('.'));
            locales[name] = { name, fileName: files[i], filePath, source: fileBuffer.toString('utf-8') };
          }
        }
      } catch (error) {
        console.error(error);
        throw new Error(`Failed reading directory '${project.path}'.`);
      }

      // Parse locales
      for (let locale in locales) {
        try {
          locales[locale].translations = JsonUtils.flatten(JSON.parse(locales[locale].source));
          locales[locale].editing = false;
        } catch (error) {
          locales[locale].translations = null;
          locales[locale].state = 'error';
          locales[locale].message = `Failed parsing file '${locales[locale].fileName}': ` + error.message;
          console.warn(error);
        }
      }

      // Collect keys
      const keys = [];
      for (let locale in locales) {
        if (locales[locale].state !== 'error') {
          for (let key in locales[locale].translations) {
            if (!keys.includes(key)) {
              keys.push(key);
            }
          }
        }
      }

      // Add empty string to all missing translations and count translations
      for (let locale in locales) {
        if (locales[locale].state !== 'error') {
          let translationCount = 0;
          for (let key of keys) {
            if (locales[locale].translations[key] === undefined) {
              locales[locale].translations[key] = '';
            }
            if (locales[locale].translations[key] !== '') {
              translationCount++;
            }
          }
          locales[locale].translationCount = translationCount;
          locales[locale].state = translationCount === keys.length ? 'success' : 'warning';
        }
      }

      // Commit project!
      if (project.name !== '') {
        commit('bookmarkProject', project);
      }
      commit('loadProject', { project, locales, keys });
      commit('setMenu', 'locales');
    },
  },
  modules: {},
});
