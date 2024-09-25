import { fetchDynamicParams } from '@/app/lib/utils.js'
import PostPageClient from './client.jsx'

export default function PostPage(props) {

    return (
        <PostPageClient />
    )
}

// for static build
export async function generateStaticParams() {
    // params [ { username, id }]
    const { data } = await fetchDynamicParams('/next/posts')
    if (!data) return []
    return data
}