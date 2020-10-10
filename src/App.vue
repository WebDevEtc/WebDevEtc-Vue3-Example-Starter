<template>
  <div class="app">
    <Header />

    <div class="app__content">
      <Sidebar class="app__nav"/>
      <main class="app__inner-content">
        <router-view/>
      </main>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import Sidebar from "@/components/layout/components/Sidebar.vue";
import Header from "@/components/layout/components/Header.vue";

export default defineComponent({
  name: 'App',
  components: {
    Sidebar,
    Header,
  },
});

</script>

<style lang="scss">

.app {
  &__content {
    max-width: $size-app-max-width;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding-bottom: $grid-20;

    @media screen and (min-width: $size-mobile-breakpoint){
      flex-direction: row;
    }
  }

  &__nav {
    flex: 0 0 $grid-40;
  }

  &__inner-content {
    padding: $grid-3 $grid-7;
    flex-grow: 1;
  }
}
</style>
