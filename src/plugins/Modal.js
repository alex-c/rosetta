import Vue from 'vue';
import Modal from './Modal.vue';
const ModalClass = Vue.extend(Modal);

const ModalPlugin = {
  install: function(Vue, options) {
    Vue.prototype.$modal = function(props, callback) {
      const instance = new ModalClass({
        propsData: {
          ...props,
          callback,
        },
      });
      instance.$mount();
      this.$el.appendChild(instance.$el);
    };
  },
};

export default ModalPlugin;
