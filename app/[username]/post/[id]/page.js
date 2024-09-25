import PostPageClient from './client.jsx'


export default function PostPage(props) {

    return (
        <PostPage />
    )
}

// for static build
export async function generateStaticParams() {
    // params [ { username, id }]
    const response = await fetch(`${API_URL}/next/posts`, {
        method: 'GET',
        body: JSON.stringify({
            username: process.env.NEXT_USER,
            password: process.env.NEXT_PASSWORD,
        })
    });

    let { data } = await response.json()
    
    if (!data) throw Error('error. GET /next/posts')

    console.log(data)
    return data
}