<template>
  <div class="sidebar">
    <nav class="sidebar__block">
      <h2 class="sidebar__heading">Navigation</h2>

      <ul class="sidebar__links">
        <li class="sidebar__link">
          <router-link :to="{name: 'blog.index'}">Home</router-link>
        </li>
        <li class="sidebar__link">
          <router-link :to="{name: 'blog.create'}">Add post</router-link>
        </li>

        <li class="sidebar__link"><a href="https://webdevetc.com/">Web dev etc blog</a></li>
        <li class="sidebar__link">
          <a href="https://github.com/WebDevEtc/WebDevEtc-Vue3-Example-Starter">Vue 3 example project on github</a>
        </li>
        <li class="sidebar__link">
          <a href="https://webdevetc.com/blog/vue-3-guide-with-example-code-snippets/">Vue 3 guide</a>
        </li>

      </ul>
    </nav>

    <div class="sidebar__block">
      <h2 class="sidebar__heading">Top posts</h2>

      <ul class="sidebar__links">
        <li v-for="post in posts" :key="post.slug" class="sidebar__link">
          <router-link :to="{name: 'blog.show', params: {slug: post.slug}}">
            {{ post.title }}
            <span class="sidebar__upvotes">
            ({{ post.upvotes }}+)
          </span>
          </router-link>
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from "vuex";

export default defineComponent({
  name: 'Sidebar',
  components: {},
  setup() {
    const store = useStore()

    return {
      posts: computed(() => store.getters.topPosts),
    }
  },
});
</script>

<style lang="scss">
.sidebar {
  &__block {
    box-shadow: $box-shadow-standard;
    margin: $grid-3;
    padding: $grid-1;

    @media screen and (min-width: $size-mobile-breakpoint) {
      padding: $grid-3;
      margin-bottom: $grid-6;
    }
  }

  &__heading {
    padding: 0;
    margin: $grid-1;

    @media screen and (min-width: $size-mobile-breakpoint) {
      margin: $grid-3;
    }
  }

  &__links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    @media screen and (min-width: $size-mobile-breakpoint) {
      flex-direction: column;
    }
  }

  &__link {
    padding: 0;
    margin: 0 $grid-1;

    @media screen and (min-width: $size-mobile-breakpoint) {
      margin: 0;
    }

    &:last-of-type {
      padding-bottom: $grid-1;
    }

    a {
      text-align: left;
      display: block;
      color: $color-text-link;
      text-decoration: none;
      padding: $grid-5 0 0;


      &:hover {
        text-decoration: underline;
      }

      &.router-link-active {
        font-weight: $font-weight-bold;
      }
    }
  }

  &__upvotes {
    color: $colour-secondary;
  }
}
</style>
