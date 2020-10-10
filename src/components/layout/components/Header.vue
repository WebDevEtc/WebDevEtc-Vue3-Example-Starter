<template>
  <header class="header">
    <h1 class="header__logo">Example vue 3 site</h1>
  </header>
</template>

<script lang="ts">
import { defineComponent} from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: $color-white;
  box-shadow: $box-shadow-standard;
  min-height: $grid-10;
  margin-bottom: $grid-2;

  @media screen and (min-width: $size-mobile-breakpoint) {
    margin-bottom: $grid-9;
    min-height: $grid-20;
  }

  &__logo {
    font-size: $font-size-m;
  }
}
</style>
