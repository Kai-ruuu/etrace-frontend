import { apiPath } from "$lib/helpers/api"

export async function signin(formData = {}) {
    try {
        const res = await fetch(apiPath("/api/v1/authentication/login"), {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: formData.email.value,
                password: formData.password.value,
            })
        })
        const data = await res.json()
        return [res.status, data]
    } catch (error) {
        console.error("Unable to signin: ", error)
    }
}

export async function signout() {
    try {
        const res = await fetch(apiPath("/api/v1/authentication/logout"), {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()
        return [res.status, data]
    } catch (error) {
        console.error("Unable to signout: ", error)
    }
}

export async function me() {
    try {
        const res = await fetch(apiPath("/api/v1/authentication/me"), {
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()
        return [res.status, data]
    } catch (error) {
        console.error("Unable to get user info: ", error)
    }
}