'use strict';

module.exports = (req, res, next) => {
    if (req.files == null || req.body.title == null || req.body.body == null) {
        console.log("mmo redirecting!\n\n");
        console.log(req);
        return res.redirect('/posts/new');
    }
    next();
}
