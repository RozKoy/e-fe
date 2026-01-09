export const ROUTE_LISTS: Map<string, string> = new Map([
    // GUEST
    ["public-member", "/anggota"],
    ["public-article", "/berita"],
    ["public-article-detail", "/berita/:id"],
    ["public-proposal", "/usulan"],
    ["public-proposal-add", "/usulan/tambah"],
    ["public-proposal-edit", "/usulan/:id/ubah"],
    ["public-proposal-detail", "/usulan/:id"],

    // ADMIN
    // Dashboards
    ["dashboard", "/admin/dashboard"],

    // Proposals
    ["proposal", "/admin/proposal"],
    ["proposal-detail", "/admin/proposal/:id"],

    // Articles
    ["article", "/admin/article"],
    ["article-add", "/admin/article/add"],
    ["article-edit", "/admin/article/edit/:id"],

    // Categories
    ["category", "/admin/category"],
    ["category-add", "/admin/category/add"],
    ["category-edit", "/admin/category/edit/:id"],

    // Areas
    ["area", "/admin/area"],
    ["area-add", "/admin/area/add"],
    ["area-edit", "/admin/area/edit/:id"],

    // Fractions
    ["fraction", "/admin/fraction"],
    ["fraction-add", "/admin/fraction/add"],
    ["fraction-edit", "/admin/fraction/edit/:id"],

    // User Accesses
    ["access", "/admin/accesses"],
    ["access-add", "/admin/accesses/add"],
    ["access-edit", "/admin/accesses/edit/:id"],

    // Users
    ["user", "/admin/user"],
    ["user-add", "/admin/user/add"],
    ["user-edit", "/admin/user/edit/:id"],

    // Positions
    ["position", "/admin/position"],
    ["position-add", "/admin/position/add"],
    ["position-edit", "/admin/position/edit/:id"],

    // Commissions
    ["commission", "/admin/commission"],
    ["commission-add", "/admin/commission/add"],
    ["commission-edit", "/admin/commission/edit/:id"],

    // Roles
    ["role", "/admin/role"],
    ["role-add", "/admin/role/add"],
    ["role-edit", "/admin/role/edit/:id"],

    // AUTH
    // Login
    ["login", "/auth/login"],

    // Registration
    ["register", "/auth/register"],

    // LOCAL
    ["local-login", "/be/auth/login"],
    ["local-logout", "/be/auth/logout"],

    // API
    // Public
    ["api-public-area-get", "/api/public/areas"],
    ["api-public-user-get", "/api/public/users"],
    ["api-public-user-structural-get", "/api/public/users/structural"],
    ["api-public-category-get", "/api/public/categories"],
    ["api-public-proposal-get", "/api/public/proposals"],
    ["api-public-proposal-one", "/api/public/proposals/:id"],
    ["api-public-proposal-year-get", "/api/public/proposals/year"],
    ["api-public-proposal-vote-get", "/api/public/proposalVotes/count/:id"],
    ["api-public-proposal-vote-add", "/api/proposalVotes/vote/:id"],
    [
        "api-public-proposal-discussion-get",
        "/api/public/proposalDiscussions/proposal/:id",
    ],
    ["api-public-proposal-discussion-add", "/api/proposalDiscussions/:id"],

    // Dashboards
    ["api-dashboard-get", "/api/dashboards"],

    // Proposals
    ["api-proposal-get", "/api/proposals"],
    ["api-proposal-add", "/api/proposals"],
    ["api-proposal-delete", "/api/proposals/:id"],
    ["api-proposal-assign", "/api/proposalAssignments/assign"],
    ["api-proposal-finish", "/api/proposalAssignments/finish/:id"],
    ["api-proposal-self-vote-get", "/api/proposalVotes/self/:id"],

    // Articles
    ["api-article-get", "/api/public/news"],
    ["api-article-add", "/api/news"],
    ["api-article-one", "/api/public/news/:id"],
    ["api-article-update", "/api/news/:id"],
    ["api-article-delete", "/api/news/:id"],

    // Categories
    ["api-category-get", "/api/categories"],
    ["api-category-add", "/api/categories"],
    ["api-category-one", "/api/categories/:id"],
    ["api-category-update", "/api/categories/:id"],
    ["api-category-delete", "/api/categories/:id"],

    // Areas
    ["api-area-get", "/api/areas"],
    ["api-area-add", "/api/areas"],
    ["api-area-one", "/api/areas/:id"],
    ["api-area-update", "/api/areas/:id"],
    ["api-area-delete", "/api/areas/:id"],

    // Fractions
    ["api-fraction-get", "/api/fractions"],
    ["api-fraction-add", "/api/fractions"],
    ["api-fraction-one", "/api/fractions/:id"],
    ["api-fraction-update", "/api/fractions/:id"],
    ["api-fraction-delete", "/api/fractions/:id"],

    // User Accesses
    ["api-access-get", "/api/userAccesses"],
    ["api-access-add", "/api/userAccesses"],
    ["api-access-one", "/api/userAccesses/:id"],
    ["api-access-update", "/api/userAccesses/:id"],
    ["api-access-delete", "/api/userAccesses/:id"],

    // Users
    ["api-user-get", "/api/users"],
    ["api-user-add", "/api/users"],
    ["api-user-one", "/api/users/:id"],
    ["api-user-update", "/api/users/:id"],
    ["api-user-delete", "/api/users/:id"],

    // User Profiles
    ["api-profile-get", "/api/users/profile"],
    ["api-profile-update", "/api/userProfiles/self"],

    // Positions
    ["api-position-get", "/api/positions"],
    ["api-position-add", "/api/positions"],
    ["api-position-one", "/api/positions/:id"],
    ["api-position-update", "/api/positions/:id"],
    ["api-position-delete", "/api/positions/:id"],

    // Commissions
    ["api-commission-get", "/api/commissions"],
    ["api-commission-add", "/api/commissions"],
    ["api-commission-one", "/api/commissions/:id"],
    ["api-commission-update", "/api/commissions/:id"],
    ["api-commission-delete", "/api/commissions/:id"],

    // Roles
    ["api-role-get", "/api/roles"],
    ["api-role-add", "/api/roles"],
    ["api-role-one", "/api/roles/:id"],
    ["api-role-update", "/api/roles/:id"],
    ["api-role-delete", "/api/roles/:id"],

    // Permissions
    ["api-permission-get", "/api/permissions"],

    // Auth
    ["api-login", "/api/auth/login"],
    ["api-register", "/api/auth/register"],
    ["api-token-check", "/api/auth/check-token"],
]);
