import { apiPath } from "$lib/helpers/api"

async function signin(formData = {}) {
    try {
        const res = await fetch(apiPath("/api/v1/authentication/login"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: formData.email.value,
                password: formData.password.value,
            })
        })
        const data = await res.json()
        console.log(data)
    } catch (error) {
        console.error("Unable to signin: ", error)
    }
}

export {
    signin
}