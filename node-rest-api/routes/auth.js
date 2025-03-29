import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();
/*
GET: get data from server, when client send GET server will send back
POST: post data to server
PUT: update resources
DELETE
USE: mount subroute
*/

/*
res.status(200).json(user): return status code and return json format msg
bcrypt: password encryption
*/

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User successfully registered
 *       500:
 *         description: Server error
 */

//REGISTER
router.post("/register", async (req, res) => {
  try{
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })

    //save user and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch(err) {
    res.status(500).json(err);
  }

})

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       404:
 *         description: User not found
 *       400:
 *         description: Wrong password
 *       500:
 *         description: Server error
 */

//LOGIN
router.post("/login", async (req, res) => {
  try{
    const user = await User.findOne({email: req.body.email});
    !user && res.status(404).json("user not found");

    //pwd checking
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch(err) {
    res.status(500).json(err);
  }

})

export default router;