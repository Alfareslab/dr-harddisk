import { getCollection } from 'astro:content';

/**
 * Retrieves all published posts from the 'posts' collection.
 * It strictly filters out any post where `draft` is true.
 * It also sorts the posts by publication date in descending order.
 */
export async function getPublishedPosts() {
    const allPosts = await getCollection('posts', (data) => {
        return data.data.draft !== true;
    });

    // Sort by pubDate descending (newest first)
    return allPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
