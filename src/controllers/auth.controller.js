const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

require("dotenv").configs();
const newToken = (user)=>{
    return jwt.sign({user}, process.env.key);
}

const register = async (req, res)=>{
    try {
        let user = await User.findOne({email: req.body.email});

        if(user){
            return res.status(400).send({messege: "email already exist"})
        }
        user = await User.create(req, body);

        const token = newToken(user)
        return res.status(200).send({user, token});
    } catch (err) {
        res.status(400).send({messege: "Email already exists"})
    }
}



const login = async (req, res)=>{
    try {
        let user = await User.findOne({email: req.body.email});

        if(user){
            return res.status(400).send({messege: "wrong email or password"})
        }
        const match = user.checkPassword(req.body.password);

        if(!match){
            return res.status(400).send("wrong email or password")
        }

        const token = newToken(user)
        return res.status(200).send({user, token});
    } catch (err) {
        res.status(400).send({messege: "Email already exists"})
    }
}


module.exports = {register, login};