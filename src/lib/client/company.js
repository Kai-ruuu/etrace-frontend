import { apiPath } from "$lib/helpers/api"

export const Company = {
    searchCompanies: async function(query = undefined, page = 1, pageSize = 20) {
        try {
            const params = new URLSearchParams();
    
            if (query !== undefined) params.set("query", query);
    
            params.set("page", page.toString());
            params.set("pageSize", pageSize.toString());
            
            const apiUrl = apiPath("/api/v1/company/search?" + params.toString())
            const res = await fetch(apiUrl, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to search companies: ", error)
        }
    },

    approveById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/company/${id}/approve`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to approve company: ", error)
        }
    },

    rejectById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/company/${id}/reject`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to reject company: ", error)
        }
    },

    pendById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/company/${id}/pend`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to pend company: ", error)
        }
    },
}