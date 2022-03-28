
const express = require("express");

const User = require("../models/todo.model");

const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("", authenticate, async(req,res)=>{
    try {
        const todo = await todo.create(req.body);

        return res.status(200).send(todo);
    } catch (err) {
        return res.status(400).send({message:err, message})
    }
})

module.exports = router;