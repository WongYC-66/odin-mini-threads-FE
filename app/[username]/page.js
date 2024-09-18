export default function ProfilePage({ params }) {

    let { username } = params
    username = username.slice(3,)   // remove %40 or @

    return (
        <>
            <h2 className="text-center font-black">{username}</h2>
        </>
    )
}