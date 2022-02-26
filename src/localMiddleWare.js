export const localMiddleWare = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "wetube-practice";
    next();
}

export const privateMiddleWare = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    }
    else {
        return res.redirect("/login");
    }
}

export const publicMiddleWare = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/");
    }
}