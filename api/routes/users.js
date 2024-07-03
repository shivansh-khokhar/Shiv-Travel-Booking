import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js";
import {verifyToken, verifyUser, verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router();


// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//     res.send("Hello user, you are logged in");
// });
// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("Hello user, you are logged in and you can delete your account.");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("Hello admin, you are logged in and you can delete any account.");
// });


// Update
router.put("/:id", verifyUser, updateUser);

// Delete
router.delete("/:id", verifyUser, deleteUser);

// Get
router.get("/:id", verifyUser, getUser);

// Get All
router.get("/", verifyAdmin, getAllUsers);


export default router;