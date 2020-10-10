<template>
  <div class="blog-summary">

    <router-link
        :to="{name: 'blog.show', params: {slug: post.slug}}"
        class="blog-summary__link">
      {{ post.title }}
    </router-link>

    <button
        data-name="BlogSummaryDelete"
        class="blog-summary__delete-btn"
        @click="$emit('deletePost', post.slug)">Delete
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent,} from 'vue';

export default defineComponent({
  name: 'BlogSummary',
  components: {},
  props: {
    post: Object,
  },
});
</script>
<style lang="scss">
.blog-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $grid-3;

  &__link {
    font-size: $font-size-l;
  }

  &__delete-btn {
    background-color: $color-danger;
    color: $color-white;
    text-align: center;
    display: inline-block;
    padding: .275rem .55rem;
    line-height: 1.5;
    border: $border-width solid $color-danger;
    border-radius: $border-radius;
    cursor: pointer;
    transition: all $transition;

    &:hover {
      color: $color-white;
      background-color: $color-danger-highlight;
      border-color: $color-danger-highlight;
    }
  }
}
</style>
