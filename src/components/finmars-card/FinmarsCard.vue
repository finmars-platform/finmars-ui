<template>
  <div class="finmars-card">
    <slot name="header"></slot>  <!-- Slot for the header -->
    <slot></slot>               <!-- Default slot for content -->
    <slot name="footer"></slot> <!-- Slot for the footer -->
  </div>
</template>

<style scoped>
.finmars-card {
  border: 1px solid var(--table-border-color);
  border-radius: 8px;
  margin: 0.5rem;
  background: var(--card-background-color);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);

}
</style>
