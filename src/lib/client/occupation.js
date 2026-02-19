import { apiPath } from "$lib/helpers/api"

export const Occupation = {
    searchWithCourseId: async function(courseId = 1, aligned = undefined, query = undefined, page = 1, pageSize = 20) {
        try {
            const params = new URLSearchParams();
    
            params.set("course_id", courseId)

            if (aligned !== undefined) params.set("aligned", aligned)
            if (query !== undefined) params.set("query", query)
    
            params.set("page", page.toString());
            params.set("pageSize", pageSize.toString());
            
            const apiUrl = apiPath("/api/v1/insti/occupation/search-with-course-id?" + params.toString())
            const res = await fetch(apiUrl, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to search occupations: ", error)
        }
    },
    
    unalignByCourseAndOccupationId: async function(courseId, occupationId) {
        try {
            const apiUrl = apiPath(`/api/v1/insti/occupation/${courseId}/${occupationId}/unalign`)
            const res = await fetch(apiUrl, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to unalign occupation to course: ", error)
        }
    },
    
    alignByCourseAndOccupationId: async function(courseId, occupationId) {
        try {
            const apiUrl = apiPath(`/api/v1/insti/occupation/${courseId}/${occupationId}/align`)
            const res = await fetch(apiUrl, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to align occupation to course: ", error)
        }
    },
}

