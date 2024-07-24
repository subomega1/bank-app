import express from 'express'
import { payment } from '../controller/paymentController.js'
import {protectRoute} from '../midleware/protectRoute.js'



const router = express.Router()

router.post('/:senderUsername', protectRoute,payment )

export default router