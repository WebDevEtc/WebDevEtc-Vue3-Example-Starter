import {createStore} from 'vuex'
import {Post, postFactory} from "@/components/blog/model/Post";

interface RootState {
    posts: Post[]
}

// Store is initialised here - in the real world you would make an API call.
export default createStore<RootState>({
    state: {
        posts: [
            // populate with 5 dummy posts
            ...Array.from({length: 5}).map(() => postFactory())
        ] ,
    },
    getters: {
        allPosts(state) :Post[]{
            return state.posts
        },

        // Get all posts, ordered by upvotes:
        topPosts(state) :Post[]{
            return [...state.posts].sort((a, b) => {
                if (a.upvotes < b.upvotes) return 1;
                if (a.upvotes > b.upvotes) return -1;
                return 0;
            })
        }
    },
    mutations: {
        deletePost(state, slug:string) :void{
            const index = state.posts.findIndex(post => post.slug === slug);
            if (index === -1) return;

            state.posts.splice(index, 1)
        }
    },
    actions: {
        getPost(context, slug :string): Post | undefined {
            return context.state.posts.find(post => post.slug === slug)
        },

        deletePost(context, slug: string): void{
            context.commit('deletePost', slug);
        },

        // Increment upvote count for a post:
        upvote(context, slug: string) :void{
            const post = context.state.posts.find(post => post.slug === slug)
            if (!post) return;
            post.upvotes++
        },

        // Create a new post:
        addPost(context, newPost: Post):void {
            context.state.posts.push({...newPost});
        }
    },

    modules: {}
})
