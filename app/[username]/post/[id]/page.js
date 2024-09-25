import { fetchDynamicParams } from '@/app/lib/utils.js'
import PostPageClient from './client.jsx'

export default function PostPage(props) {

    return (
        <PostPageClient />
    )
}

// for static build
// Next.js will invalidate the cache when a
// request comes in, at most once every 10 seconds.
export const revalidate = 10;
// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

export async function generateStaticParams() {
    // params [ { username, id }]
    const { data } = await fetchDynamicParams('/next/posts')
    if (!data) return []
    return data
}