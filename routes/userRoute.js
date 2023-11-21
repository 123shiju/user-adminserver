import express from 'express'
import { authUser,updateUserProfile,GetUserProfile,logOutUser,registerUser } from '../Controllers/userController.js'
import { multerUserImage }  from '../config/mutlerConfig.js'
 const router=express.Router()

 import  { protect }  from '../middleware/AuthMiddleware.js'
 router.post('/',registerUser)
 router.post('/auth',authUser)
 router.post('/logout',logOutUser)
 router.route('/profile').get(protect,GetUserProfile).put(protect,multerUserImage.single("userImage"),updateUserProfile)
 
 

export default router