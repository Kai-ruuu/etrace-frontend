import { apiPath } from "$lib/helpers/api"

export const Dean = {
    add: async function(deanInfo) {
        try {
            const apiUrl = apiPath("/api/v1/dean")
            const res = await fetch(apiUrl, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(deanInfo)
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to add dean: ", error)
        }
    },
    
    searchDeans: async function(query = undefined, page = 1, pageSize = 20) {
        try {
            const params = new URLSearchParams();
    
            if (query !== undefined) params.set("query", query);
    
            params.set("page", page.toString());
            params.set("pageSize", pageSize.toString());
            
            const apiUrl = apiPath("/api/v1/dean/search?" + params.toString())
            const res = await fetch(apiUrl, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to search deans: ", error)
        }
    },

    enableById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/dean/${id}/enable`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to enable dean: ", error)
        }
    },

    disableById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/dean/${id}/disable`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to disable dean: ", error)
        }
    },
}