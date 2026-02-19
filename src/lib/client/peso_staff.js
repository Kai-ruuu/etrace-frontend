import { apiPath } from "$lib/helpers/api"

export const PesoStaff = {
    add: async function(pesoStaffInfo) {
        try {
            const apiUrl = apiPath("/api/v1/peso-staff")
            const res = await fetch(apiUrl, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pesoStaffInfo)
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to add peso staff: ", error)
        }
    },
    
    searchPesoStaffs: async function(query = undefined, page = 1, pageSize = 20) {
        try {
            const params = new URLSearchParams();
    
            if (query !== undefined) params.set("query", query)
    
            params.set("page", page.toString());
            params.set("pageSize", pageSize.toString());
            
            const apiUrl = apiPath("/api/v1/peso-staff/search?" + params.toString())
            const res = await fetch(apiUrl, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to search peso staffs: ", error)
        }
    },

    enableById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/peso-staff/${id}/enable`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to enable peso staff: ", error)
        }
    },

    disableById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/peso-staff/${id}/disable`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to disable peso staff: ", error)
        }
    },
}