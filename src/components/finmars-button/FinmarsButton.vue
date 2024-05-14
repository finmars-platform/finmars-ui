<template>
  <button :class="['finmars-button', $attrs.class]" v-bind="$attrs">
    <slot></slot> <!-- Slot for custom content -->
  </button>
</template>

<script>
// import './button.css';
import {computed, reactive} from 'vue';

export default {
  name: 'finmars-button',

  props: {
  },

  setup(props, {emit}) {
    props = reactive(props);

  },
};
</script>
<style lang="scss" scoped>

.finmars-button {
  text-transform: none;
  font-weight: 600;
  //line-height: 1;
  border-radius: 100px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  min-height: 36px;
  min-width: 88px;
  line-height: 36px;
  vertical-align: middle;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
  border: 0;
  padding: 0 6px;
  margin: 6px 8px;
  background: transparent;
  color: currentColor;
  white-space: nowrap;
  font-weight: 500;
  font-size: 14px;
  font-style: inherit;
  font-variant: inherit;
  font-family: inherit;
  text-decoration: none;
  overflow: hidden;
  transition: box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.finmars-button:hover {
  opacity: var(--hover-opacity);
  background: var(--primary-color);
  color: var(--secondary-color);
}

.finmars-button.fm-raised {
  box-shadow: 0px 1px 3px 1px #00000026;
  box-shadow: 0px 1px 2px 0px #0000004D;
}

.finmars-button.signed-button {
  border-radius: initial;
}

.finmars-button.fm-raised {
  color: var(--secondary-color);
  background-color: var(--outline-background-color);
}

.finmars-button.fm-primary.fm-raised {
  padding: 0 15px;

  //font-weight: 700;
  color: var(--on-primary-color);
  //background-color: var(--primary-color);;
  background-color: var(--primary-color);

  //border-radius: 3px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .26);

  &:not([disabled]):hover {
    //opacity: 0.5;
    opacity: var(--hover-opacity);
    background-color: var(--primary-color);
  }

  &:not([disabled]).md-focused {
    //opacity: 0.5;
    opacity: var(--focus-opacity);
    background-color: var(--primary-color);
  }
}

.finmars-button.fm-primary {
  color: var(--primary-color);
}

.finmars-button.outline-button {
  min-width: auto;
  max-height: 36px;
  background-color: var(--outline-background-color);
  color: var(--primary-color);
  //font-weight: 700;

  border: 1px solid var(--outline-color);
  //border-radius: 3px;

  &:not([disabled]):hover {
    opacity: .8;
  }

  span.material-icons {
    color: var(--primary-color);
  }

  ng-md-icon svg {
    fill: var(--primary-color);
  }
}

.finmars-button.align-button {
  background-color: var(--page-background-color);
  color: var(--secondary-color);

  &:hover {
    color:var(--primary-color);
  }

  &.active {
    color: var(--primary-color);
    background-color: rgba(240, 90, 34, 0.1);
  }

}

button.fm-raised.md-warn.finmars-button {
  fill: var(--color-error);
}

.classifier-select-dialog-view {
  width: 500px;
}

.icon-btn-basics {
  background-color: transparent;
  border: none;
}


.finmars-button.link-button {
  background-color: transparent;
  color: var(--primary-color);
  // font-weight: 700;
  font-weight: 500;
  //border-radius: 3px;

  &:not([disabled]):hover {
    background-color: var(--state-active-background-color);
  }
}

.icon-button-small {
  min-width: 2px;
  margin: 2px;
  height: 32px;
  min-height: 32px;
  box-sizing: border-box;

  font-size: 12px;
  padding: 0 8px;
  line-height: 40px;

  color: var(--secondary-color);

  .material-icons {
    font-size: 20px;
    line-height: 1.5;
  }


  &:not([disabled]):hover {
    background: var(--state-active-background-color);
    opacity: .8;
  }
}

.finmars-button.md-default-theme.fm-raised:not([disabled]):hover, .finmars-button.fm-raised:not([disabled]):hover {
  background-color: var(--state-active-background-color);
  opacity: .8;
}


</style>