import { apiPath } from "$lib/helpers/api"

export const GraduateRecord = {
    add: async function(recordInfo) {
        const formData = new FormData()

        for (let [key, value] of Object.entries(recordInfo)) {
            formData.append(key, value)
        }
        
        try {
            const apiUrl = apiPath("/api/v1/insti/graduate-record")
            const res = await fetch(apiUrl, {
                method: "POST",
                credentials: "include",
                body: formData
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to add graduate record: ", error)
        }
    },

    getContents: async function(filename) {
        try {
            const apiUrl = apiPath("/api/v1/insti/graduate-record/contents/" + filename);
            const res = await fetch(apiUrl, {
                method: "GET",
                credentials: "include"
            });
            const data = await res.text();

            return [res.status, data];
        } catch (error) {
            console.error("Unable to get record contents: ", error);
        }
    },
    
    getAll: async function() {
        try {
            const apiUrl = apiPath("/api/v1/insti/graduate-record")
            const res = await fetch(apiUrl, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to get all graduate records: ", error)
        }
    },
    
    searchGraduateRecords: async function(query = undefined, courseId=undefined, archived = undefined, page = 1, pageSize = 20) {
        try {
            const params = new URLSearchParams();
    
            if (query !== undefined) params.set("query", query);
            if (courseId !== undefined) params.set("course_id", courseId);
            if (archived !== undefined) params.set("archived", archived);
    
            params.set("page", page.toString());
            params.set("pageSize", pageSize.toString());
            
            const apiUrl = apiPath("/api/v1/insti/graduate-record/search?" + params.toString())
            const res = await fetch(apiUrl, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to search graduate records: ", error)
        }
    },
    
    archiveById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/insti/graduate-record/${id}/archive`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to archive graduate record: ", error)
        }
    },
    
    restoreById: async function(id) {
        try {
            const apiUrl = apiPath(`/api/v1/insti/graduate-record/${id}/restore`)
            const res = await fetch(apiUrl, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            return [res.status, data]
        } catch (error) {
            console.error("Unable to restore graduate record: ", error)
        }
    }
}

