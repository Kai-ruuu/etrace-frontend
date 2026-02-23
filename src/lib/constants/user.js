export const role = {
    SYSTEM_ADMIN: "SYSTEM_ADMIN",
    DEAN: "DEAN",
    PESO_STAFF: "PESO_STAFF",
    COMPANY: "COMPANY",
    ALUMNI: "ALUMNI",
}

export const displayApprovalStatus = {
    PENDING: "Pending",
    APPROVED: "Approved",
    REJECTED: "Rejected",
}

export const approvalStatus = {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
}

export const roleIndexPage = {
    [role.SYSTEM_ADMIN]: "/user/system-admin",
    [role.DEAN]: "/user/dean",
    [role.PESO_STAFF]: "/user/peso-staff",
    [role.COMPANY]: "/user/company",
    [role.ALUMNI]: "/user/alumni",
}

export const EmploymentStatus = {
    EMPLOYED: 'EMPLOYED',
    UNEMPLOYED: 'UNEMPLOYED',
    SELF_EMPLOYED: 'SELF_EMPLOYED',
};