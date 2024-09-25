import ProfilePageClient from './client.jsx'


export default function ProfilePage(props) {

    return (
        <ProfilePageClient />
    )
}

// for static build
export async function generateStaticParams() {
    // params [ { username, id }]
    const response = await fetch(`${API_URL}/next/users`, {
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