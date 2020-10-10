import {mount, RouterLinkStub} from "@vue/test-utils";
import {postFactory} from "@/components/blog/model/Post";
import BlogSummary from "@/components/blog/components/BlogSummary.vue";

it('emits "deletePost" when delete button is pressed', emitsDeletePost);

function emitsDeletePost(): void {
    const post = postFactory();

    const $router = {
        push: jest.fn()
    }
    const $route = {
        params: {
            id: 1
        }
    }

    const wrapper = mount(BlogSummary, {
        props: {post},
        global: {
            components: {
                RouterLink: RouterLinkStub
            },
            mocks: {$route, $router}
        }
    })

    const button = wrapper.get('[data-name="BlogSummaryDelete"]');

    expect(wrapper.emitted('deletePost')).toBeUndefined()
    button.trigger("click");
    expect(wrapper.emitted('deletePost')).toEqual([[post.slug]])
}
