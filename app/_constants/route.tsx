export const ROUTE_LISTS: Map<string, string> = new Map([
    // ADMIN
    // Dashboards
    ["dashboard", "/admin/dashboard"],

    // Categories
    ["category", "/admin/category"],
    ["category-add", "/admin/category/add"],

    // Areas
    ["area", "/admin/area"],
    ["area-add", "/admin/area/add"],

    // Fractions
    ["fraction", "/admin/fraction"],
    ["fraction-add", "/admin/fraction/add"],

    // User Accesses
    ["access", "/admin/accesses"],
    ["access-add", "/admin/accesses/add"],

    // Users
    ["user", "/admin/user"],
    ["user-add", "/admin/user/add"],
    ["user-edit", "/admin/user/edit/:id"],

    // Positions
    ["position", "/admin/position"],
    ["position-add", "/admin/position/add"],

    // Commissions
    ["commission", "/admin/commission"],
    ["commission-add", "/admin/commission/add"],

    // Roles
    ["role", "/admin/role"],
    ["role-add", "/admin/role/add"],

    // AUTH
    // Login
    ["login", "/auth/login"],

    // LOCAL
    ["local-login", "/be/auth/login"],
    ["local-logout", "/be/auth/logout"],

    // API
    // Categories
    ["api-category-get", "/api/categories"],
    ["api-category-add", "/api/categories"],
    ["api-category-delete", "/api/categories/:id"],

    // Areas
    ["api-area-get", "/api/areas"],
    ["api-area-add", "/api/areas"],
    ["api-area-delete", "/api/areas/:id"],

    // Fractions
    ["api-fraction-get", "/api/fractions"],
    ["api-fraction-add", "/api/fractions"],
    ["api-fraction-delete", "/api/fractions/:id"],

    // User Accesses
    ["api-access-get", "/api/userAccesses"],
    ["api-access-add", "/api/userAccesses"],
    ["api-access-delete", "/api/userAccesses/:id"],

    // Users
    ["api-user-get", "/api/users"],
    ["api-user-add", "/api/users"],
    ["api-user-one", "/api/users/:id"],
    ["api-user-update", "/api/users/:id"],
    ["api-user-delete", "/api/users/:id"],

    // User Profiles
    ["api-profile-get", "/api/users/profile"],
    ["api-profile-update", "/api/userProfiles/:id"],

    // Positions
    ["api-position-get", "/api/positions"],
    ["api-position-add", "/api/positions"],
    ["api-position-delete", "/api/positions/:id"],

    // Commissions
    ["api-commission-get", "/api/commissions"],
    ["api-commission-add", "/api/commissions"],
    ["api-commission-delete", "/api/commissions/:id"],

    // Roles
    ["api-role-get", "/api/roles"],
    ["api-role-add", "/api/roles"],
    ["api-role-delete", "/api/roles/:id"],

    // Permissions
    ["api-permission-get", "/api/permissions"],

    // Auth
    ["api-login", "/api/auth/login"],
    ["api-token-check", "/api/auth/check-token"],
]);
