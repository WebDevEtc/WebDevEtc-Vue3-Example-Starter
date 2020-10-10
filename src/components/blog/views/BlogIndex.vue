<template>
  <div class="blog-index">
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
