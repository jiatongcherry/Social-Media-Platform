import User from "../models/User.js";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();
/*
req.params.id: get the id from the url
findByIdAndDelete: delete the user by id
*/

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update
 *       - name: userId
 *         in: body
 *         required: true
 *         description: The ID of the user making the request
 *       - name: password
 *         in: body
 *         required: false
 *         description: The new password for the user
 *     responses:
 *       200:
 *         description: Account has been updated
 *       403:
 *         description: You can update only your account!
 *       500:
 *         description: Server error
 */

//update user
router.put("/:id", async (req, res) => {
  //check if user id matches 
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    //new pwd update
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      //set all input inside body
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!")
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete
 *       - name: userId
 *         in: body
 *         required: true
 *         description: The ID of the user making the request
 *     responses:
 *       200:
 *         description: Account has been deleted
 *       403:
 *         description: You can delete only your account!
 *       500:
 *         description: Server error
 */

//delete user
router.delete("/:id", async (req, res) => {
  //check if user id matches 
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!")
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User information
 *       500:
 *         description: Server error
 */

// //get a user
// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     //don't show unnecessary info
//     //user._doc carry all user info
//     const { password, updatedAt, ...other } = user._doc;
//     res.status(200).json(other);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

/*
url query
in frontend Profile.jsx we need to get user info but the url only contains name
below we can use either userId or username to locate user
*/
router.get("/", async (req, res) => {
  //lh:8800/api/users?userId=67ea749
  //lh:8800/api/users?username=cherry
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
    ? await User.findById(userId)
    : await User.findOne({username: username});

    //don't show unnecessary info
    //user._doc carry all user info
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @swagger
 * /users/{id}/follow:
 *   put:
 *     summary: Follow a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to follow
 *       - name: userId
 *         in: body
 *         required: true
 *         description: The ID of the user making the request
 *     responses:
 *       200:
 *         description: User has been followed
 *       403:
 *         description: You can't follow yourself or already follow this user
 *       500:
 *         description: Server error
 */

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      //update followings and followers
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});

/**
 * @swagger
 * /users/{id}/unfollow:
 *   put:
 *     summary: Unfollow a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to unfollow
 *       - name: userId
 *         in: body
 *         required: true
 *         description: The ID of the user making the request
 *     responses:
 *       200:
 *         description: User has been unfollowed
 *       403:
 *         description: You can't unfollow yourself or don't follow this user
 *       500:
 *         description: Server error
 */

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      //update followings and followers
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("You don't follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
})

export default router;