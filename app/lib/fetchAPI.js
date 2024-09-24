import API_URL from "./apiUrl"
import { readLocalStorage } from "./utils.js"

// const { token, id, username, photoURL } = readLocalStorage()

export async function getAllFollowingPosts() {
    const { token, id, username, photoURL } = readLocalStorage()

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
    const { token, id, username, photoURL } = readLocalStorage()

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

    return { error }
}

export async function createNewPost(e) {
    const { token, id, username, photoURL } = readLocalStorage()

    const formData = new FormData(e.target);
    const objectData = Object.fromEntries(formData.entries());

    const response = await fetch(`${API_URL}/posts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Attach the Bearer token
        },
        body: JSON.stringify(objectData),
    });

    let { error } = await response.json()
    if (error) {
        console.error(error)
        alert("Ooops, something went wrong, try again")
    }
    return { error }
}

export async function createNewComment(e, postId) {
    const { token, id, username, photoURL } = readLocalStorage()

    const formData = new FormData(e.target);
    const objectData = Object.fromEntries(formData.entries());
    objectData.postId = postId

    const response = await fetch(`${API_URL}/comments/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Attach the Bearer token
        },
        body: JSON.stringify(objectData),
    });

    let { error } = await response.json()

    // if error show error message
    if (error) {
        console.error(error)
        alert("Ooops, something went wrong, try again")
    }

    // passed, do something..
    return { error }
}

export async function getAllUsers() {
    const { token, id, username, photoURL } = readLocalStorage()

    const response = await fetch(`${API_URL}/profiles/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Attach the Bearer token
        },
    });

    let { profiles, myFollowings, error } = await response.json()

    // if error show error message
    if (error || !profiles) {
        console.error("failed to fetch all users.", error)
    }
    // passed
    myFollowings = new Set(myFollowings)

    profiles = profiles.map(profile => {
        profile.isFollowing = myFollowings.has(profile.user.username)       // add attribute isFollowing 
        return profile
    })

    return { profiles, error }
}

export async function sendFollowUnfollowRequest(toFollow, targetUserId) {
    const { token, id, username, photoURL } = readLocalStorage()

    let url = `${API_URL}/users`
    url += toFollow ? "/follow/" : "/unfollow/"
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Attach the Bearer token
        },
        body: JSON.stringify({
            followId: targetUserId,
            unfollowId: targetUserId,
        })
    });

    let { error } = await response.json()
    if (error) {
        console.error(error)
        alert("Ooops, something went wrong, try again")
    }
    return { error }
}

export async function getAPost(postId) {
    const { token, id, username, photoURL } = readLocalStorage()

    const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Attach the Bearer token
        },
    });

    let { post, error } = await response.json()

    // if error show error message
    if (error) {
        console.error(error)
    }

    return { post, error }
}

export async function fetchUserProfile(targetUsername) {
    const { token, id, username, photoURL } = readLocalStorage()

    const response = await fetch(`${API_URL}/profiles/${targetUsername}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Attach the Bearer token
        },
    });

    let { profile, postLiked, error } = await response.json()

    // if error show error message
    if (error) {
        console.error(error)
        alert("Ooops, something went wrong, try again")
    }

    postLiked = new Set(postLiked)
    profile.threads.forEach(t => t.isLiked = postLiked.has(t.id))
    profile.replies.forEach(({ Post }) => Post.isLiked = postLiked.has(Post.id))

    // for this user's multiple replies to a thread, filter to leave only unique
    let replyToSameThread = new Set()
    profile.replies = profile.replies.filter(({ Post }) => {
        if(replyToSameThread.has(Post.id)) return false
        replyToSameThread.add(Post.id)
        return true
    })

    return { profile, postLiked, error }
}

export async function uploadPhotoAndGetURL(file) {
    const { token, id, username, photoURL:localPhotoURL } = readLocalStorage()

    const formData = new FormData();
    formData.append('avatar', file); // Append the file to FormData object

    const response = await fetch(`${API_URL}/profiles/update-photo/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, // Attach the Bearer token
        },
        body: formData,
    });
    const { photoURL, error } = await response.json()
    if (error || !photoURL) {
        console.log("error : ", error)
    }
    return { photoURL, error }
}

export async function putProfileUpdate(e, avatarURL, toIncludeAvatarURL) {
    const { token, id, username, photoURL } = readLocalStorage()

    const formData = new FormData(e.target);
    const objectData = Object.fromEntries(formData.entries());

    if (toIncludeAvatarURL)
        objectData.photoURL = avatarURL    // append if input is set hidden

    const response = await fetch(`${API_URL}/profiles/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Attach the Bearer token
        },
        body: JSON.stringify(objectData),
    });
    let { error } = await response.json()
    if (error) {
        console.error(error)
        alert("Ooops, something went wrong, try again")
    }
    return { error }
}
