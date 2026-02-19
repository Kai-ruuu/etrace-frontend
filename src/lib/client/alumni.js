import { approvalStatus } from "$lib/constants/user";
import { apiPath } from "$lib/helpers/api"

export const Alumni = {
    getGeocodedOccLocation: async function(occupation) {
        try {
            const apiUrl = apiPath("/api/v1/alumni/geocode-occupation-location")
            const res = await fetch(apiUrl, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ location: occupation.location })
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to geocode alumni occupation location: ", error)
        }
    },
    
    searchAlumni: async function(query = undefined, status = approvalStatus.PENDING, page = 1, pageSize = 20) {
        try {
            const params = new URLSearchParams();
    
            params.set("approval_status", status);

            if (query !== undefined) params.set("query", query);
    
            params.set("page", page.toString());
            params.set("pageSize", pageSize.toString());
            
            const apiUrl = apiPath("/api/v1/alumni/search?" + params.toString())
            const res = await fetch(apiUrl, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to search alumni: ", error)
        }
    },

    getById: async function(id) {
        try {
            const apiUrl = apiPath("/api/v1/alumni/" + id)
            const res = await fetch(apiUrl, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to fetch alumni: ", error)
        }
    },

    approveById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/alumni/${id}/approve`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to approve alumni: ", error)
        }
    },

    rejectById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/alumni/${id}/reject`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to reject alumni: ", error)
        }
    },

    pendById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/alumni/${id}/pend`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to pend alumni: ", error)
        }
    },
}