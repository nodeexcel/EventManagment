const mongoose = require('../db');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User', {
    name: String,
    email: { type: String, unique: true },
    password: String
});


// user register function

User.register = async (UserInfo) => {
    UserInfo.password = md5(UserInfo.password)
    const user = new User(UserInfo);
    let info = await user.save();

    return info;
}

// user login function

User.login = async (loginInfo) => {
    let userData = await User.findOne({ email: loginInfo.email, password: md5(loginInfo.password) })
    if (userData) {
        let token = await jwt.sign({ id: userData._id }, 'secret');
        delete userData.password
        return { status: 1, token: token, data: userData }
    } else {
        return { status: 0, token: null, data: userData, message: "Invalid Login Details" }
    }
}

module.exports = User;