import faker from "faker";

export interface Post {
    title: string
    body: string
    slug: string
    upvotes: number
}

// Create a dummy post. Used for demonstration purposes, and in tests.
export function postFactory(override:Partial<Post> = {}):Post {
    return   {
        title: faker.lorem.sentence(),
        slug: faker.helpers.slugify(faker.lorem.words().toLocaleLowerCase('en')),
        body: faker.lorem.paragraph(),
        upvotes: faker.random.number(100),

        ... override
    }
}
