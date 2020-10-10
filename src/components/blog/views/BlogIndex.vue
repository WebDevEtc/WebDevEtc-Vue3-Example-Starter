<template>
  <div class="blog-index">

    <h2>Vue 3 example starter boilerplate</h2>

    <p>This is the live version of <b>web dev etc's Vue 3 example boilerplate project</b>.</p>

    <p><a href="https://github.com/WebDevEtc/WebDevEtc-Vue3-Example-Starter">Vue 3 example project on github</a> or <a href="https://webdevetc.com/blog/vue-3-guide-with-example-code-snippets/">view my guide on setting up Vue 3 (including Vue Router, Vuex, Sass, etc)</a></p>

    <div
        v-for="post in posts"
        :key="post.slug">
      <BlogSummary
          @deletePost="deletePost"
          :post="post"/>
    </div>

    <div class="blog-index__summary">Showing {{ postCount }} posts</div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import BlogSummary from "@/components/blog/components/BlogSummary.vue";
import {useStore} from "vuex";

export default defineComponent({
  name: 'BlogIndex',
  components: {
    BlogSummary,
  },
  setup() {
    const store = useStore()
    const posts = computed(() => store.getters.allPosts);

    return {
      posts,
      postCount: computed(() => posts.value.length),

      async deletePost(slug: string) {
        await store.dispatch('deletePost', slug )
        console.log(`Deleted ${slug} successfully`)
      }
    }
  },
});
</script>

<style lang="scss">
.blog-index {
  &__summary {
    color: $color-meta;
    margin: $grid-9 0;
  }
}

</style>
