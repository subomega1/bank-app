 import express from 'express'
 import { addUser , deleteUser , updateUser } from '../controller/adminController.js'
 import {protectAdminRoute} from '../midleware/protectAdmin.js'

 const router = express.Router()

 router.post('/add-user',protectAdminRoute ,addUser )
 router.post('/delete-user/:id',protectAdminRoute ,deleteUser )
 router.post('/update-user/:id', protectAdminRoute ,updateUser )
 
 
 export default router