import { goto } from "$app/navigation"
import { displayApprovalStatus, role, roleIndexPage } from "$lib/constants/user"

export function openIndexPage(userRole) {
    goto(roleIndexPage[userRole])
}

export function getDisplayName(userRole) {
    const roleDisplayName = {
        [role.SYSTEM_ADMIN]: "System Administrator"
    }

    return roleDisplayName[userRole]
}

export function getDisplayApprovalStatus(status) {
    return displayApprovalStatus[status]
}