import User from "../models/User";

export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "Join" });
}

export const postJoin = async (req, res) => {
    const { username, email, name, password, password2 } = req.body;
    if (password != password2) {
        return res.status(400).render("join", { errorMessage: "password was not correct" });
    }
    const exist = await User.exists({ $or: [{ username }, { email }] });
    if (exist) {
        return res.status(400).render("join", { pageTitle: "join", errorMessage: "This username/email is already taken" })
    }

    try {
        await User.create({
            username,
            email,
            name,
            password,
            password2
        });
        return res.redirect("/login");
    }
    catch (error) {
        res.status(400).render("join", { pageTitle: "join", errorMessage: error._message });
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