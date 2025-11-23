export const ROUTE_LISTS: Map<string, string> = new Map([
    // ADMIN
    // Dashboards
    ["dashboard", "/admin/role"],

    // Categories
    ["category", "/admin/category"],
    ["category-add", "/admin/category/add"],

    // Areas
    ["area", "/admin/area"],
    ["area-add", "/admin/area/add"],

    // Fractions
    ["fraction", "/admin/fraction"],
    ["fraction-add", "/admin/fraction/add"],

    // Users
    ["user", "/admin/user"],
    ["user-add", "/admin/user/add"],
    ["user-edit", "/admin/user/edit/:id"],

    // Roles
    ["role", "/admin/role"],
    ["role-add", "/admin/role/add"],

    // AUTH
    // Login
    ["login", "/auth/login"],

    // LOCAL
    ["local-login", "/be/auth/login"],

    // API
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
