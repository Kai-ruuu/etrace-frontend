import { apiPath } from "$lib/helpers/api"

export async function signupAsAlumni(formData = {}) {
    try {
        const fData = new FormData();

        for (const [key, value] of Object.entries(formData)) {
            if (key.includes("confirm")) {
                continue;
            }

            if (["socials", "occupations"].includes(key)) {
                fData.append(key, JSON.stringify(value.value));
                continue;
            }
            
            fData.append(key, value.value);
        }
        
        const res = await fetch(apiPath("/api/v1/authentication/register/alumni"), {
            method: "POST",
            credentials: "include",
            body: fData
        })
        const data = await res.json();

        console.log(data);
        
        return [res.status, data];
    } catch (error) {
        console.error("Unable to signup: ", error);
    }
}

export async function signupAsCompany(formData = {}) {
    try {
        const fData = new FormData();

        for (const [key, value] of Object.entries(formData)) {
            if (key.includes("confirm")) {
                continue;
            }
            
            fData.append(key, value.value);
        }
        
        const res = await fetch(apiPath("/api/v1/authentication/register/company"), {
            method: "POST",
            credentials: "include",
            body: fData
        })
        const data = await res.json();

        console.log(data);
        
        return [res.status, data];
    } catch (error) {
        console.error("Unable to signup: ", error);
    }
}

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