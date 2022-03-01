import multer from "multer";

export const localMiddleWare = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "wetube-practice";
    res.locals.loggedInUser = req.session.user || {}
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

export const avatarUpload = multer({
    dest: "uploads/avatar/",
    limits: {
        fileSize: 300000
    }
});

export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: {
        fileSize: 10000000
    }
});