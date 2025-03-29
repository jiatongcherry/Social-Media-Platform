import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post has been created
 *       500:
 *         description: Server error
 */

//create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
})

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post has been updated
 *       403:
 *         description: You can update only your post
 *       500:
 *         description: Server error
 */

//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been updated");
    } else {
      res.status(403).json("You can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post has been deleted
 *       403:
 *         description: You can delete only your post
 *       500:
 *         description: Server error
 */

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne({ $set: req.body });
      res.status(200).json("Post has been deleted");
    } else {
      res.status(403).json("You can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

/**
 * @swagger
 * /posts/{id}/like:
 *   put:
 *     summary: Like or dislike a post
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The post has been liked or disliked
 *       500:
 *         description: Server error
 */

//like or dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *       500:
 *         description: Server error
 */

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @swagger
 * /posts/timeline/all:
 *   get:
 *     summary: Get timeline posts
 *     parameters:
 *       - name: userId
 *         in: body
 *         required: true
 *         description: The ID of the user requesting the timeline
 *     responses:
 *       200:
 *         description: Timeline posts retrieved successfully
 *       500:
 *         description: Server error
 */

//get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });

    //Promise.all() multi async task, return when all finished
    /*
    1.find the current user id
    2.as for friendPosts, use map
      for all friendId, find the corresponding post
    */
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    //concat: combine two arrays
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});


/**
 * @swagger
 * /profile/{username}:
 *   get:
 *     summary: Get user posts by username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: The username of the user whose posts you want to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of posts by the user retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Server error
 */

//get user's all posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const currentUserPosts = await Post.find({ userId: user._id });
    res.status(200).json(currentUserPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;