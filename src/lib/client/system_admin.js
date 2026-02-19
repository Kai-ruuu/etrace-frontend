import { apiPath } from "$lib/helpers/api"

export const SystemAdmin = {
    add: async function(systemAdminInfo) {
        try {
            const apiUrl = apiPath("/api/v1/system-admin")
            const res = await fetch(apiUrl, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(systemAdminInfo)
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to add system admin: ", error)
        }
    },
    
    searchSystemAdmins: async function(query = undefined, page = 1, pageSize = 20) {
        try {
            const params = new URLSearchParams();
    
            if (query !== undefined) params.set("query", query);
    
            params.set("page", page.toString());
            params.set("pageSize", pageSize.toString());
            
            const apiUrl = apiPath("/api/v1/system-admin/search?" + params.toString())
            const res = await fetch(apiUrl, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to search system admins: ", error)
        }
    },

    enableById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/system-admin/${id}/enable`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to enable system admin: ", error)
        }
    },

    disableById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/system-admin/${id}/disable`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to disable system admin: ", error)
        }
    },
}