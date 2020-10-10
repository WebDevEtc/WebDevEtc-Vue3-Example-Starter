<template>
  <div class="add-post">
    <h2 class="add-post__title">Add a new blog post</h2>

    <form class="add-post__form" @submit.prevent="add">
      <div class="add-post__field">
        <label class="add-post__label" for="add-post__title">Post title</label>
        <input class="add-post__input" id="add-post__title" type="text" name="title" v-model="postFieldData.title"/>
      </div>

      <div class="add-post__field">
        <label class="add-post__label" for="add-post__slug">Post slug</label>
        <input class="add-post__input"  id="add-post__slug" type="text" name="slug" v-model="postFieldData.slug"/>
      </div>

      <div class="add-post__field">
        <label class="add-post__label" for="add-post__body">Post body</label>
        <textarea  class="add-post__input"  id="add-post__body" name="body" v-model="postFieldData.body"/>
      </div>

      <div class="add-post__field">
        <label class="add-post__label" for="add-post__save">Ready?</label>
        <button class="add-post__input" id="add-post__save" type="submit">Add</button>

      </div>
    </form>

    <div class="add-post__stats">
      Computed word count: {{ computedWordCount }}<br />
      Watched word count: {{ watchedWordCount }}<br />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, watchEffect, ref, computed} from 'vue';
import faker from "faker"
import {Post} from "@/components/blog/model/Post";
import {useStore} from "vuex";

function wordCount(text: string): number {
  // Very basic function to get a count of the number of words.
  // (Does not take into account punctuation etc)
  return text.split(" ").length;
}

type PostFieldData = Pick<Post, 'title'|'slug'|'body'>

export default defineComponent({
  name: 'AddPost',
  setup() {
    const store = useStore()

    const initialPostData: PostFieldData={
      title: 'A new post!',
      slug: 'a-new-post',
      body: 'write something here!',
    }

    const postFieldData = reactive(initialPostData)

    // computed() will automatically run, and set computedWordCount to whatever
    // value gets returned (in this case wordCount(postFieldData.body). It will
    // update every time postFieldData.body is mutated.
    const computedWordCount = computed(() => wordCount(postFieldData.body));

    const watchedWordCount = ref(0);
    watchEffect(() => {
      // when postFieldData.body is mutated, this function will be run which updates
      // watchedWordCount's value:
      watchedWordCount.value = wordCount(postFieldData.body)
      // (This is a very simple example that is not too useful)
    })

    return {
      postFieldData,
      computedWordCount,
      watchedWordCount,

      add() {
        // function which adds the current post to vuex,
        // then resets it with new dummy post data.
        // You can keep hitting the add button and it will populate
        // vuex with multiple posts.
        const newPost: Post = {
          ...postFieldData,
          upvotes: 0
        };

        store.dispatch('addPost', newPost)

        // Reset postFieldData with dummy text (so you can populate easily
        // by clicking add multiple times).
        postFieldData.title = faker.lorem.sentence()
        postFieldData.slug = faker.helpers.slugify(faker.lorem.words().toLocaleLowerCase('en'))
        postFieldData.body = faker.lorem.paragraph()
      }
    }
  },
});
</script>

<style lang="scss">
.add-post {
  &__title {
    font-size: $font-size-l;
    font-weight: $font-weight-bold;
  }

  &__field {
    display: flex;
    align-items: center;
    margin: $grid-2;
  }

  &__label {
    text-align: right;
    flex: 0 0 $grid-20;
    font-size: $font-size-m;
  }

  &__form {
    margin: $grid-5 0;
  }

  &__input {
    flex: 1 0 auto;
    font-size: $font-size-m;
    font-family: Helvetica, sans-serif;
    padding: $grid-1;
  }
}
</style>
