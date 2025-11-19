export const ROUTE_LISTS: Map<string, string> = new Map([
    // ADMIN

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
]);
