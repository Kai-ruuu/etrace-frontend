import { apiPath } from "$lib/helpers/api"

export const School = {
    add: async function(name) {
        try {
            const apiUrl = apiPath("/api/v1/insti/school")
            const res = await fetch(apiUrl, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name })
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to add school: ", error)
        }
    },
    
    getAll: async function() {
        try {
            const apiUrl = apiPath("/api/v1/insti/school")
            const res = await fetch(apiUrl, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to get all schools: ", error)
        }
    },
    
    searchSchools: async function(query = undefined, archived = undefined, page = 1, pageSize = 20) {
        try {
            const params = new URLSearchParams();
    
            if (query !== undefined) params.set("query", query);
            if (archived !== undefined) params.set("archived", archived);
    
            params.set("page", page.toString());
            params.set("pageSize", pageSize.toString());
            
            const apiUrl = apiPath("/api/v1/insti/school/search?" + params.toString())
            const res = await fetch(apiUrl, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to search schools: ", error)
        }
    },
    
    archiveById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/insti/school/${id}/archive`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to archive school: ", error)
        }
    },
    
    restoreById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/insti/school/${id}/restore`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to restore school: ", error)
        }
    }
}

