require("dotenv").configs();

const jwt = require("jsonwebtoken");

const verifyToken = (token)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.key, (err,decoded)=>{
            if(err) return reject(err);

            return resolve(decoded);
        });
    });
}

const authenticate = async(req, res, next)=>{
    if(!req.headers.authorization)
    return res.status(400).send({message: "Authorization token not found or invalid"});

    if(!req.headers.authorization.startsWith("Bearer "))
    return res.status(400).send({message: "Authorization token not found or invalid"});

    const token = req.headers.authorization.trim().split(" ")[1];

    let decoded;
    try {
        decoded = await verifyToken(token);
    } catch (err) {
        console.log(err);
        return res.status(400).send({message: "Authorization token not found or invalid"})
    }
    console.log(decoded);
        req.userID = decoded.user._id;

        return next();
}

module.exports = authenticate;