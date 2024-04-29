<template>
  <div class="finmars-card-header">
    <slot></slot> <!-- Allow anything to be passed via slot -->
  </div>
</template>

<script>
// import './button.css';
import {reactive} from 'vue';

export default {
  name: 'finmars-card-header',

  props: {},

  setup(props, {emit}) {
    props = reactive(props);

  },
};
</script>
<style lang="scss" scoped>

.finmars-card-header {
  padding: 0.5rem;
}

</style>