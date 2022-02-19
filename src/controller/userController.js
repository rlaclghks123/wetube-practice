


export const join = (req, res) => {
    return res.render("join", { pageTitle: "Join" });
}

export const login = (req, res) => {
    return res.render("login", { pageTitle: "Login" });
}

export const logout = (req, res) => {
    return res.render("logout", { pageTitle: "Logout" });
}
export const userEdit = (req, res) => {
    return res.render("userEdit", { pageTitle: "UserEdit" });
}
export const userProfile = (req, res) => {
    return res.render("userProfile", { pageTitle: "UserProfile" });
}