<template>
  <div class="finmars-card-footer">
    <slot></slot> <!-- Allow anything to be passed via slot -->
  </div>
</template>

<script>
// import './button.css';
import {computed, reactive} from 'vue';

export default {
  name: 'finmars-card-footer',

  props: {
  },

  setup(props, {emit}) {
    props = reactive(props);

  },
};
</script>
<style lang="scss" scoped>

.finmars-card-footer {
  padding: 0.5rem;
}

</style>