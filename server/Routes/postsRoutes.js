/**
 *   @author : Rushi Patel (B00886157)
 *   @description : routes to map application http request.
 */


 const express=require("express");

 const authenticateUser=require("../Middleware/authenticate.js");
 const {createPost,updatePost,deletePost,viewPosts,filterPostsByDate,filterPostsByCategory,filterPostsByMyPosts}=require("../Controller/postsController.js");
 
 const postsRouter = express.Router();
 
 //HTTP post request to register user map to registerUser function.
 postsRouter.post('/createPost', createPost);
 postsRouter.post('/updatePost', updatePost);
 postsRouter.post('/deletePost', deletePost);
 postsRouter.get('/viewPosts', viewPosts);
 postsRouter.post('/filterPostsByDate', filterPostsByDate);
 postsRouter.post('/filterPostsByCategory', filterPostsByCategory);
 postsRouter.post('/filterPostsByMyPosts', filterPostsByMyPosts);
 
 module.exports=postsRouter;