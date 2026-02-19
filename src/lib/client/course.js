import { apiPath } from "$lib/helpers/api"

export const Course = {
    add: async function(courseInfo) {
        try {
            const apiUrl = apiPath("/api/v1/insti/course")
            const res = await fetch(apiUrl, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(courseInfo)
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to add course: ", error)
        }
    },
    
    getAll: async function() {
        try {
            const apiUrl = apiPath("/api/v1/insti/course")
            const res = await fetch(apiUrl, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to get all courses: ", error)
        }
    },
    
    getDeanList: async function() {
        try {
            const apiUrl = apiPath("/api/v1/insti/course/dean-list")
            const res = await fetch(apiUrl, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to get all dean school courses: ", error)
        }
    },
    
    searchCourses: async function(query = undefined, archived = undefined, page = 1, pageSize = 20) {
        try {
            const params = new URLSearchParams();
    
            if (query !== undefined) params.set("query", query);
            if (archived !== undefined) params.set("archived", archived);
    
            params.set("page", page.toString());
            params.set("pageSize", pageSize.toString());
            
            const apiUrl = apiPath("/api/v1/insti/course/search?" + params.toString())
            const res = await fetch(apiUrl, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to search courses: ", error)
        }
    },
    
    archiveById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/insti/course/${id}/archive`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to archive course: ", error)
        }
    },
    
    restoreById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/insti/course/${id}/restore`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to restore course: ", error)
        }
    }
}

