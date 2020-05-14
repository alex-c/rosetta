import Vue from 'vue';
import Modal from './Modal.vue';
const ModalClass = Vue.extend(Modal);

const ModalPlugin = {
  install: function(Vue, options) {
    Vue.prototype.$prompt = function(props, callback) {
      const instance = new ModalClass({
        propsData: {
          type: 'prompt',
          width: '400px',
          ...props,
          callback,
        },
      });
      instance.$mount();
      this.$el.appendChild(instance.$el);
    };
    Vue.prototype.$confirm = function(props, callback) {
      const instance = new ModalClass({
        propsData: {
          type: 'confirm',
          width: '400px',
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
