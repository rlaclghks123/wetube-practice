import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

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

export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "Login" });
}

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).render("login", { pageTitle: "Error", errorMessage: "useraname is not exists " });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", { pageTitle: "Error", errorMessage: "password is not exists " });
    }

    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GITHUB_ID,
        allow_signup: true,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;

    const tokenRequest = await (await fetch(finalUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    })).json();

    if ("access_token" in tokenRequest) {
        const { access_token } = tokenRequest;
        const baseUrl = "https://api.github.com";

        const userData = await (await fetch(`${baseUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        })).json();

        const userEmail = await (await fetch(`${baseUrl}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })).json();

        const emailObj = await userEmail.find((email) => email.primary === true && email.verified === true);
        let user = await User.findOne({ email: emailObj.email });
        if (!user) {
            user = await User.create({
                username: userData.login,
                email: emailObj.email,
                name: userData.name,
                password: "",
                socialOnly: true,
            });
        };
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/");
    }
}


export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/")
}

export const getEdit = (req, res) => {
    return res.render("editUser", { pageTitle: "Edit User" });
}
export const postEdit = async (req, res) => {
    const {
        session: {
            user: { _id }
        },
        body: { username, name, email }
    } = req;

    const exist = await User.exists({
        $and: [{ _id: { $ne: _id } }, { $or: [{ username }, { email }] }]
    });
    if (exist) {
        return res.status(400).render("editUser", { pageTitle: "Edit User", errorMessage: "username/email is already taken" })
    }
    const updateUser = await User.findByIdAndUpdate(_id, {
        username,
        name,
        email
    },
        { new: true });
    req.session.user = updateUser;
    return res.redirect("/");
}
export const userProfile = (req, res) => {
    return res.render("userProfile", { pageTitle: "UserProfile" });
}