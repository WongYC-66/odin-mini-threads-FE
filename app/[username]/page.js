import { fetchDynamicParams } from '../lib/utils.js'
import ProfilePageClient from './client.jsx'

export default function ProfilePage(props) {

    return (
        <ProfilePageClient />
    )
}

// for static build
export async function generateStaticParams() {
    // params [ { username }]
    const { data } = await fetchDynamicParams('/next/users')
    if (!data) return []
    return data
}