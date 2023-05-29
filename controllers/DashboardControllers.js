const Userpage = async (req, res) => {
    //    check role
    const { username } = req.session;
    try {
        const user = await User.getUser(username);
        return user.role;
        next();
    }
    catch (error) {
        res.redirect("/auth/login");
    }
}


module.exports = {
    Userpage,
}