<template>
  <div v-if="post" class="single-post">

    <h2 class="single-post__title">{{ post.title }}</h2>

    <div class="single-post__votes">
      <span class="single-post__current-votes">
        Votes: {{ post.upvotes }}
      </span>

      <button class="single-post__upvote-btn" @click="upvote">
        +1
      </button>
    </div>

    <p class="single-post__body">{{ post.body }}</p>

    <p class="single-post__meta">Route Slug: <code>{{ $route.params.slug }}</code></p>
  </div>
  <div v-else>
    Error, unable to find post
  </div>
</template>


<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from "vuex";
import {useRoute} from "vue-router"; // @ is an alias to /src

export default defineComponent({
  name: 'SinglePost',
  components: {},
  setup() {
    const store = useStore();
    const route = useRoute()
    const post = computed(() => store.getters.allPosts.find((post:any) => post.slug === route.params.slug))

    return {
      post,
      upvote: () => store.dispatch('upvote', route.params.slug),
    }
  },
});
</script>
<style lang="scss">
.single-post{

  &__title {
    font-size:$font-size-l;
    font-weight: $font-weight-bold;
    margin: $grid-3 0;
  }

  &__votes {
    margin: $grid-3 0;
    display: flex;
    justify-content: space-between;
    color: $color-meta;
  }

  &__body {
    font-family: Georgia, serif;
    font-size: $font-size-m;
  }

  &__meta {
    color: $color-meta;
    margin: $grid-10 0;
  }
}

</style>
