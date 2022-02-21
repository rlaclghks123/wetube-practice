import User from "../models/User";

export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "Join" });
}

export const postJoin = async (req, res) => {
    const { username, email, name, password, password2 } = req.body;
    if (password === password2) {
        await User.create({
            username,
            email,
            name,
            password,
            password2
        });
        return res.redirect("/login");
    } else {
        return res.render("join", { errorMessage: "password was not correct" });
    }
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