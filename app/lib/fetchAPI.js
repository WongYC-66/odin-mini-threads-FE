import API_URL from "./apiUrl"
import { readLocalStorage } from "./utils.js"

const { token, id, username } = readLocalStorage()

export async function getAllFollowingPosts() {
    const response = await fetch(`${API_URL}/posts/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Attach the Bearer token
        },
    });

    let { posts, postLiked, error } = await response.json()

    // if error show error message
    if (error) {
        console.error("Ooops, fetched post failed. ", error)
        return { error, posts: [] }
    }
    // passed

    // add attr isLiked to each post
    postLiked = new Set(postLiked)
    posts = posts.map(post => {
        post.isLiked = postLiked.has(post.id)
        return post
    })

    // remove duplicatePosts, for future infinite-scrolling(if there is)
    // let combinedPosts = [...posts, ...fetchedPosts]
    // let duplicate = new Set()
    // combinedPosts = combinedPosts.filter(post => {
    //   if(!duplicate.has(post.id)){
    //     duplicate.add(post.id)
    //     return true
    //   }
    //   return false
    // })
    return { posts }
}

export async function sendLikeUnlikePost(tolike, postId) {

    const response = await fetch(`${API_URL}/posts/like-unlike/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Attach the Bearer token
        },
        body: JSON.stringify({
            userId: id,
            postId: postId,
            like: tolike,
        })
    });

    let { error } = await response.json()

    // if error show error message
    if (error) {
        console.error(error)
        alert("Ooops, something went wrong, try again")
    }

    return {error}
}