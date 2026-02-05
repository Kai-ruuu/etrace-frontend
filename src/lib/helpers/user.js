import { goto } from "$app/navigation"
import { role } from "$lib/constants/user"

export function openIndexPage(userRole) {
    const roleIndexPage = {
        [role.SYSTEM_ADMIN]: "/user/system-admin"
    }
    
    goto(roleIndexPage[userRole])
}

export function getDisplayName(userRole) {
    const roleDisplayName = {
        [role.SYSTEM_ADMIN]: "System Administrator"
    }

    return roleDisplayName[userRole]
}