<template>
    <div>
      <label :for="editorId" class="form-label" v-if="title !== ''">{{ title }}</label>
      <textarea :id="editorId"></textarea>
    </div>
  </template>
  
  <script>
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  import { initCKEditors } from '@/plugins/functions';
  
  export default {
    name: 'CkEditorWrapper',
    props: {
      modelValue: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
      height: {
        type: String,
        default: '200px',
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const editorId = `editor-${Math.random().toString(36).substring(2, 9)}`;
      const instance = ref(null);
  
      onMounted(() => {
        instance.value = initCKEditors(editorId, props.modelValue, props.height);
  
        instance.value.on('change', () => {
          emit('update:modelValue', instance.value.getData());
        });
      });
  
      onBeforeUnmount(() => {
        if (instance.value) {
          instance.value.destroy(true);
        }
      });
  
      return {
        editorId,
      };
    },
  };
  </script>
  