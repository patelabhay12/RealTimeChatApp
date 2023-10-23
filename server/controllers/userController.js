// const User = require('../models/userModel.js');
// const brcypt = require('bcrypt');


// const register = async (req, res) => {
//     // console.log(req.body);
//     try {
//         const { username, email, password } = req.body;


//         const usernameCheck = await User.findOne({ username });
//         if (usernameCheck)
//             return res.json({ msg: "Username already used", status: false });

//         const emailcheck = await User.findOne({ email });
//         if (emailcheck)
//             return res.json({ msg: "Email id already exist ", status: false });


//         const hashPassword = await brcypt.hash(password, 10);

//         const user = await User.create({
//             email,
//             username,
//             password: hashPassword
//         });
//         delete user.password;
//         return res.json({ status: true, user });


//     } catch (error) {
//         next(error);
//     }
// }

// module.exports = register;





// const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         const user = await User.findOne({ username });
//         if (!user)
//         return res.json({ msg: "Incurrect username or password", status: false });

//         const isPasswordValid = await brcypt.compare(password, user.password);
//         if (!isPasswordValid)
//         return res.json({ msg: "Incurrect username or password", status: false });

//         delete user.password;
//         return res.json({ status: true, user });
 

//     } catch (error) {
//         next(error);
//     }
// }

// module.exports = login;



const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const flatted = require('flatted');

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        delete user.password;
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        // console.log(req.body);
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) 
            return res.json({ msg: "Username already used", status: false });
        const emailCheck = await User.findOne({ email }); 
        if (emailCheck)
            return res.json({ msg: "Email already used", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email, 
            username,
            password: hashedPassword,
        }).save();
        delete user.password;
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};


module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        return res.json(users);
    } catch (ex) {
        next(ex);
    }
};



module.exports.Setavatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage,
            },
            { new: true }
        );
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (ex) {
        next(ex);
    }
};




