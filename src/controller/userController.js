
const videos = [{
    title: "apple",
    color: "red",
    id: 1,
},
{
    title: "banana",
    color: "yellow",
    id: 2,
},
{
    title: "orange",
    color: "orange",
    id: 3,
},
]


export const home = (req, res) => {
    return res.render("home", { pageTitle: "Home", videos });
}

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