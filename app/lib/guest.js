import API_URL from '@/app/lib/apiUrl'

export async function guestLogin() {

    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: 'guest',
            password: 'guest',
        }),
    });

    let { id, token, username, photoURL, error } = await response.json()

    // if error show error message
    if (error || !id || !token) {
        console.error(error)
        setErrorMsg(error)
        document.getElementById('password').value = ""
        return
    }

    // passed
    localStorage.setItem("user", JSON.stringify({
        id,
        username,
        token,
        photoURL,
    }))

    window.location.replace("/");
}